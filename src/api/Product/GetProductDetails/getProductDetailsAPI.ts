import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getProductDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetProductDetailsProps } from "../getProductsTypes";

const getProductDetailsAPI = async ({ header, productId }: GetProductDetailsProps) => {
  const url = endpoint(productId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getProductDetailsAPI;
