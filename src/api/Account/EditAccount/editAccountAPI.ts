import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editAccountEndpoint as endpoint } from "../apiEndpoints";
import { AddEditAccountProps } from "../getAccountTypes";

const editAccountAPI = async ({
  header,
  account,
  accountId,
}: AddEditAccountProps) => {

  const url = endpoint(accountId!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ ...account }),
  }
  return fetchInterceptor(url, options)
};

export default editAccountAPI;
