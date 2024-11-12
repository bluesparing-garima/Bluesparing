import { IRoleForm, IRolesVM } from "../../components/Admin/Role/IRole";
export const convertIRoleVMToIRoleForm = (role: IRolesVM): IRoleForm => {
  const roleForm: IRoleForm = {
    id: role.id!,
    roleName: role.roleName!,
    updatedBy: role.updatedBy!,
    createdBy: role.createdBy!,
     isActive: !!role.isActive,
  };
  return roleForm;
};
