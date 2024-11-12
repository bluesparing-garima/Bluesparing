import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountManageEndpoint as endpoint } from "../apiEndpoints";
import { GetManageAccountProps } from "../getCreditDebitTypes";

const getAccountAPI = async ({ header }: GetManageAccountProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getAccountAPI;
