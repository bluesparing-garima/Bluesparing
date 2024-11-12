//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";
// const API_ENDPOINT_HOST = "http://localhost:8000";
const API_ENDPOINT_HOST = "https://api.safekaro.com";
//const API_ENDPOINT_HOST = "https://test.safekaro.com";

export const addModelEndpoint = () => `/api/model`;

export const editModelEndpoint = (modelId: string) => `/api/model/${modelId}`;

export const getModelEndpoint = () => `/api/model`;

export const getModelDetailsEndpoint = (modelId: string) =>
  `/api/model/${modelId}`;

export const deleteModelEndpoint = (modelId: string) => `/api/model/${modelId}`;

export const validateModelEndpoint = (modelName: string) =>
  `/api/model/validate-model/${modelName}`;
