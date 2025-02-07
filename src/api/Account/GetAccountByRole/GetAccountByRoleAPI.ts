
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountsByRoleEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountByRoleProps } from "../getAccountTypes";

const GetAccountByRoleAPI = async ({
  header,
  partnerId,role
}: GetAccountByRoleProps) => {
  const url = endpoint(role,partnerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default GetAccountByRoleAPI;
