import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountManageByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountManageByIdProps } from "../getCreditDebitTypes";

const getAccountManageByIdAPI = async ({
  header,
  accountId,
}: GetAccountManageByIdProps) => {
  const url = endpoint(accountId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default getAccountManageByIdAPI;
