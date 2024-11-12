import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const addProductSubTypeAPI = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
      headers: header,
      body: JSON.stringify({
        ...productSubType,
      }),
  }

  return fetchInterceptor(url, options)
};

export default addProductSubTypeAPI;

