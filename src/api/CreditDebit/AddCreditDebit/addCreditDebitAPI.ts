import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addCreditDebitEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";

const addCreditDebitAPI = async ({ header,creditDebit }: AddEditCreditDebitProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
   headers: header,
   body: JSON.stringify({
    ...creditDebit,
  }),
  }

  return fetchInterceptor(url, options)
 
};

export default addCreditDebitAPI;
