import getRoleDetailsAPI from "./getRoleDetailsAPI";
import { GetRoleDetailsProps } from "../getRolesTypes";
import convertIRoleToIRoleVM from "../convertIRoleToIRoleVM";
import { IRoles, IRolesVM } from "../../../components/Admin/Role/IRole";
import { IResponse } from "../../IResponse";

const getRoleDetailsService = async ({
  header,
  roleId,
}: GetRoleDetailsProps): Promise<IRolesVM> => {

  try {
    const res = await getRoleDetailsAPI({
      header: header,
      roleId: roleId,
    }) as IResponse<IRoles>
    const roles = convertIRoleToIRoleVM(res.data);
    return roles
  } catch (error) {
    throw error
  }

};

export default getRoleDetailsService;
