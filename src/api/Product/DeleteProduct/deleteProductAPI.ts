import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteProductEndpoint as endpoint } from "../apiEndpoints";
import { DeleteProductProps } from "../getProductsTypes";

const deleteProductAPI = async ({ header, productId }: DeleteProductProps) => {
  const url = endpoint(productId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default deleteProductAPI;
