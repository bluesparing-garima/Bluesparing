import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addRoleEndpoint as endpoint } from "../apiEndpoints";
import { AddEditRoleProps } from "../getRolesTypes";

const addRoleAPI = async ({ header, role }: AddEditRoleProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...role,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addRoleAPI;
