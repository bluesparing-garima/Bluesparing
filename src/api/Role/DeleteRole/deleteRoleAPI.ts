import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteRoleEndpoint as endpoint } from "../apiEndpoints";
import { DeleteRoleProps } from "../getRolesTypes";

const deleteRoleAPI = async ({ header, roleId }: DeleteRoleProps) => {
  const url = endpoint(roleId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteRoleAPI;
