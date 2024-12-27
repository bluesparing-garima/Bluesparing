import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addCreditDebitEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addCreditDebitAPI = async ({ header, creditDebit }: AddEditCreditDebitProps) => {
  creditDebit["parentAdminId"] = UserData.parentAdminId;
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...creditDebit,
    }),
  }
  return fetchInterceptor(url, options)
};
export default addCreditDebitAPI;
