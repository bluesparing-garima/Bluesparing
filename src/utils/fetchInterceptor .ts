import { refreshTokenAPI } from "../api/Token/RefreshTokenAPI";
import { getAccessToken } from "../Hooks/Tokens/useToken";

// const BASE_URL = "https://iimapi.bluesparing.com";
export const BASE_URL = "http://localhost:7000";

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

  const defaultHeaders: Record<string, string> = {}; // ✅ Ensure a mutable object
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  
  const headers: Record<string, string> = { ...defaultHeaders, ...(options.headers as Record<string, string>) };

  // ✅ Handle File Upload via XMLHttpRequest
  if (options.body instanceof FormData) {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || "POST", url, true);

      // ✅ Set headers properly
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      // ✅ Track Upload Progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      // ✅ Handle Response
      xhr.onload = () => {
        if (xhr.status === 401) {
          refreshTokenAPI().then((newToken) => {
            const newHeaders = { ...headers, Authorization: `Bearer ${newToken}` }; // ✅ Fix
            fetchInterceptor<T>(endpoint, { ...options, headers: newHeaders }, onProgress)
              .then(resolve)
              .catch(reject);
          });
        } else if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText) as T);
        } else {
          reject(new Error(xhr.statusText));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(options.body);
    });
  }

  // ✅ Normal Fetch Request
  const makeRequest = async (options: FetchOptions): Promise<Response> => {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      const newToken = await refreshTokenAPI();
      const newHeaders = { ...headers, Authorization: `Bearer ${newToken}` }; 
      return await fetch(url, { ...options, headers: newHeaders });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    }
    return response;
  };

  try {
    const response = await makeRequest(options);
    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};


export default fetchInterceptor;
