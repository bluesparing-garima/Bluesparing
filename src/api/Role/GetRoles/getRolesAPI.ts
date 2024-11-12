import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRoleEndpoint as endpoint } from "../apiEndpoints";
import { GetRoleProps } from "../getRolesTypes";

const getRolesAPI = async ({ header }: GetRoleProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header
  }

  return fetchInterceptor(url, options)
  
};

export default getRolesAPI;
