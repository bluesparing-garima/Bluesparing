import { refreshTokenAPI } from "../api/Token/RefreshTokenAPI";
import { getAccessToken } from "../Hooks/Tokens/useToken";

// export const BASE_URL = "http://localhost:7000";
export const BASE_URL = "https://iimapi.bluesparing.com"
export interface FetchOptions extends RequestInit {
  body?: string | FormData | null;
}

const fetchInterceptor = async <T>(
  endpoint: string,
  options: FetchOptions = {},
  onProgress?: (progress: number) => void
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAccessToken();

  const defaultHeaders: Record<string, string> = {};
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const headers: Record<string, string> = { ...defaultHeaders, ...(options.headers as Record<string, string>) };

  if (options.body instanceof FormData) {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || "POST", url, true);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        try {
          const responseJson = JSON.parse(xhr.responseText);
          if (xhr.status === 401) {
            refreshTokenAPI().then((newToken) => {
              const newHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
              fetchInterceptor<T>(endpoint, { ...options, headers: newHeaders }, onProgress)
                .then(resolve)
                .catch(reject);
            });
          } else if (xhr.status >= 200 && xhr.status < 300) {
            resolve(responseJson as T);
          } else {
            reject(new Error(responseJson.message || `Request failed with status ${xhr.status}`));
          }
        } catch (error) {
          reject(new Error("Invalid JSON response"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(options.body);
    });
  }

  const makeRequest = async (options: FetchOptions): Promise<Response> => {
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      const newToken = await refreshTokenAPI();
      const newHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
      response = await fetch(url, { ...options, headers: newHeaders });
    }

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
    
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
         throw parseError;
      }
    
      throw new Error(errorMessage);
    }
    return response;
  };

  try {
    const response = await makeRequest(options);
    return (await response.json()) as T;
  } catch (error) {
    throw error
  }
};



export default fetchInterceptor;