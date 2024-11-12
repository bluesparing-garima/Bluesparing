import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addProductEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductProps } from "../getProductsTypes";

const addProductAPI = async ({ header, product }: AddEditProductProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...product,
    }),
  }
  return fetchInterceptor(url, options)

};

export default addProductAPI;
