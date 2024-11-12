import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editProductEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductProps } from "../getProductsTypes";

const editProductAPI = async ({ header, product }: AddEditProductProps) => {
  const url = endpoint(product.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...product,
    }),
  }
  return fetchInterceptor(url, options)
 
};

export default editProductAPI;
