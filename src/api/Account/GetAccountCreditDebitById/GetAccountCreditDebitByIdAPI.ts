import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountsCreditDebitByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountByIdProps } from "../getAccountTypes";

const GetAccountCreditDebitByIdAPI = async ({
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

export default GetAccountCreditDebitByIdAPI;
