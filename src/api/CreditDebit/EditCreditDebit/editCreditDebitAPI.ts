import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editCreditDebitEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";

const editCreditDebitAPI = async ({
  header,
  creditDebit,
  creditDebitId,
}: AddEditCreditDebitProps) => {
  const url = endpoint(creditDebitId!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...creditDebit,
    }),
  }

  return fetchInterceptor(url, options)
  
};

export default editCreditDebitAPI;
