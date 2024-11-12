import addRoleAPI from "./addRoleAPI";
import { AddEditRoleProps } from "../getRolesTypes";

const addRoleService = async ({ header, role }: AddEditRoleProps): Promise<any> => {
  try {
    const res = await addRoleAPI({
      header: header,
      role: role,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addRoleService;
