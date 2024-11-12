const API_ENDPOINT_HOST = "https://api.safekaro.com"
export const refreshToken = () =>
    API_ENDPOINT_HOST.concat(`/api/user/refresh-token`);
