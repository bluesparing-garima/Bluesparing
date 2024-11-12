// const API_ENDPOINT_HOST = "http://localhost:8000";
// const API_ENDPOINT_HOST = "https://test.safekaro.com"
const API_ENDPOINT_HOST = "https://api.safekaro.com"
export const refreshToken = () =>
    API_ENDPOINT_HOST.concat(`/api/user/refresh-token`);
