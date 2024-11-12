import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetProductSubTypeProps } from "../getProductSubTypes";
const getProductSubTypeAPI = async ({ header }: GetProductSubTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default getProductSubTypeAPI;
