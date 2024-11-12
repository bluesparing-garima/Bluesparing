
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountsByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountByIdProps } from "../getAccountTypes";

const getAccountByIdAPI = async ({
  header,
  accountId,
}: GetAccountByIdProps) => {
  const url = endpoint(accountId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default getAccountByIdAPI;
