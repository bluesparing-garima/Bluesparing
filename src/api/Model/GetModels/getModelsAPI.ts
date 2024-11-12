import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getModelEndpoint as endpoint } from "../apiEndpoints";
import { GetModelProps } from "../getModelsTypes";

const getModelsAPI = async ({ header }: GetModelProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default getModelsAPI;
