import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getModelDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetModelDetailsProps } from "../getModelsTypes";

const getModelDetailsAPI = async ({ header, modelId }: GetModelDetailsProps) => {
  const url = endpoint(modelId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default getModelDetailsAPI;
