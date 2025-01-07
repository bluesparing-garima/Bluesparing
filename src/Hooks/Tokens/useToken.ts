
export const TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';


export const getAccessToken = (): string | null => {
  const at = localStorage.getItem(TOKEN_KEY)
 return at
 
}
export const getRefreshToken = (): string | null => {
  const rAt = localStorage.getItem(REFRESH_TOKEN_KEY);

  return rAt
}

export const setTokens = (accessToken: string, refreshToken: string): void => {

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = (): void => {
  localStorage.clear()

};
