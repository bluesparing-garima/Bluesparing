const API_ENDPOINT_HOST = "https://iimapi.bluesparing.com"
export const refreshToken = () =>
    API_ENDPOINT_HOST.concat(`/api/user/refresh-token`);
