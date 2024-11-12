import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCreditDebitsByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetCreditDebitByIdProps } from "../getCreditDebitTypes";

const getCreditDebitByIdAPI = async ({
  header,
  creditDebitId,
}: GetCreditDebitByIdProps) => {
  const url = endpoint(creditDebitId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getCreditDebitByIdAPI;
