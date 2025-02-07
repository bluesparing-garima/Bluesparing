import { refreshTokenAPI } from "../api/Token/RefreshTokenAPI";
import { getAccessToken } from "../Hooks/Tokens/useToken";
// const BASE_URL = "https://iimapi.bluesparing.com";
const BASE_URL = "http://localhost:8000";
export interface FetchOptions extends RequestInit {
  body?: string | FormData | null;
}
const fetchInterceptor = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAccessToken();
  const defaultHeaders: HeadersInit = {};
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  const headers: HeadersInit = { ...defaultHeaders, ...options.headers };
  const makeRequest = async (options: FetchOptions): Promise<Response> => {
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      const newToken = await refreshTokenAPI();
      const newHeaders: HeadersInit = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
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
