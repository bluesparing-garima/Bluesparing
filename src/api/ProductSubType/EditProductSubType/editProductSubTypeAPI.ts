import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const editProductSubTypeAPI = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  const url = endpoint(productSubType.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...productSubType,
    }),
  }

  return fetchInterceptor(url, options)
 
};

export default editProductSubTypeAPI;
