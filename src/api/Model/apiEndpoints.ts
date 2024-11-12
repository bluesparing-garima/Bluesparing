export const addModelEndpoint = () => `/api/model`;
export const editModelEndpoint = (modelId: string) => `/api/model/${modelId}`;
export const getModelEndpoint = () => `/api/model`;
export const getModelDetailsEndpoint = (modelId: string) =>
  `/api/model/${modelId}`;
export const deleteModelEndpoint = (modelId: string) => `/api/model/${modelId}`;
export const validateModelEndpoint = (modelName: string) =>
  `/api/model/validate-model/${modelName}`;
