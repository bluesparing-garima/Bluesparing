import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addAccountEndpoint as endpoint } from "../apiEndpoints";
import { AddEditAccountProps } from "../getAccountTypes";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addAccountAPI = async ({ header, account }: AddEditAccountProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ ...account,parentAdminId:UserData.parentAdminId }),
  }

  return fetchInterceptor(url, options)

};

export default addAccountAPI;
