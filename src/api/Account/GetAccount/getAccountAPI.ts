import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountsEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountProps } from "../getAccountTypes";

const getAccountAPI = async ({ header }: GetAccountProps) => {

  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)


};

export default getAccountAPI;
