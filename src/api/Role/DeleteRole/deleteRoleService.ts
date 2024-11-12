import deleteRoleAPI from "./deleteRoleAPI";
import { DeleteRoleProps } from "../getRolesTypes";

const deleteRoleService = async ({
  header,
  roleId,
  roles,
}: DeleteRoleProps): Promise<any> => {
  try {
    await deleteRoleAPI({
      header,
      roleId,
      roles,
    })
    const deletedRoleIndex = roles.findIndex((role) => role._id === roleId);
    roles.splice(deletedRoleIndex, 1);
    return roles;
  } catch (error) {
    throw error
  }

};

export default deleteRoleService;
