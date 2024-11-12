// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IRoleForm, IRolesVM } from "../../components/Admin/Role/IRole";

export const convertIRoleVMToIRoleForm = (role: IRolesVM): IRoleForm => {
  const roleForm: IRoleForm = {
    id: role.id!,
    roleName: role.roleName!,
    updatedBy: role.updatedBy!,
    createdBy: role.createdBy!,
    // points: role.points
    //   ? convertLocaleStringToNumber(role.points!)
    //   : 0,
     isActive: !!role.isActive,
    // createdOn: dayjs(role?.createdOn).format(DAYJS_DISPLAY_FORMAT),
  };
  return roleForm;
};
