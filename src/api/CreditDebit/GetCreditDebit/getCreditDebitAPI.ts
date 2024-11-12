import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCreditDebitsEndpoint as endpoint } from "../apiEndpoints";
import { GetCreditDebitProps } from "../getCreditDebitTypes";

const getCreditDebitAPI = async ({ header }: GetCreditDebitProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default getCreditDebitAPI;
