import editRoleAPI from "./editRoleAPI";
import { AddEditRoleProps } from "../getRolesTypes";

const editRoleService = async ({ header, role }: AddEditRoleProps): Promise<any> => {
  try {
    const res = await editRoleAPI({
      header,
      role,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editRoleService;
