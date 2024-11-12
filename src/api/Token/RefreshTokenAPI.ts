import { clearTokens, getRefreshToken, setTokens } from "../../Hooks/Tokens/useToken";
import { refreshToken as endpoint } from './apiEndpoints'
import { RefreshTokenResponse } from "./getTokenTypes";

export const refreshTokenAPI = async (): Promise<string> => {
  try {
    const response = await fetch(endpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: getRefreshToken() }),
    });

    if (!response.ok) {
      throw new Error('refresh failed');
    }
    const { accessToken, refreshToken }: RefreshTokenResponse = await response.json();
    setTokens(accessToken, refreshToken);
    return accessToken;
  } catch (error) {
    clearTokens();
    window.location.href = '/';
    throw error;
  }
};
