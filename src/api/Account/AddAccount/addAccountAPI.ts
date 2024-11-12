import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addAccountEndpoint as endpoint } from "../apiEndpoints";
import { AddEditAccountProps } from "../getAccountTypes";

const addAccountAPI = async ({ header, account }: AddEditAccountProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ ...account }),
  }

  return fetchInterceptor(url, options)

};

export default addAccountAPI;
