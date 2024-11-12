import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteModelEndpoint as endpoint } from "../apiEndpoints";
import { DeleteModelProps } from "../getModelsTypes";

const deleteModelAPI = async ({ header, modelId }: DeleteModelProps) => {
  const url = endpoint(modelId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default deleteModelAPI;
