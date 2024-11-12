import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getProductEndpoint as endpoint } from "../apiEndpoints";
import { GetProductProps } from "../getProductsTypes";

const getProductsAPI = async ({ header }: GetProductProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getProductsAPI;
