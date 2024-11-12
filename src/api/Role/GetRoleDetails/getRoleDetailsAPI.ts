import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRoleDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetRoleDetailsProps } from "../getRolesTypes";

const getRoleDetailsAPI = async ({ header, roleId }: GetRoleDetailsProps) => {
  const url = endpoint(roleId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default getRoleDetailsAPI;
