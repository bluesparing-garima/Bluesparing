const API_ENDPOINT_HOST = "https://api.bluesparing.com"
export const refreshToken = () =>
    API_ENDPOINT_HOST.concat(`/api/user/refresh-token`);
