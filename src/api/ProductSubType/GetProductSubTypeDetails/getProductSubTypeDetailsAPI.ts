import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getProductSubTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetProductSubTypeDetailsProps } from "../getProductSubTypes";
const getProductSubTypeDetailsAPI = async ({ header, productSubTypeId }: GetProductSubTypeDetailsProps) => {
  const url = endpoint(productSubTypeId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default getProductSubTypeDetailsAPI;
