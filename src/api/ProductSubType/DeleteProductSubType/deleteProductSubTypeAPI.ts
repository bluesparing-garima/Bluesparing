import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteProductSubTypeProps } from "../getProductSubTypes";

const deleteProductSubTypeAPI = async ({ header, productSubTypeId }: DeleteProductSubTypeProps) => {
  const url = endpoint(productSubTypeId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteProductSubTypeAPI;
