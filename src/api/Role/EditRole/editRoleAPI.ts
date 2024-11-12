import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editRoleEndpoint as endpoint } from "../apiEndpoints";
import { AddEditRoleProps } from "../getRolesTypes";

const editRoleAPI = async ({ header, role }: AddEditRoleProps) => {
  const url = endpoint(role.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...role,
    }),
  }

  return fetchInterceptor(url, options)
 
};

export default editRoleAPI;
