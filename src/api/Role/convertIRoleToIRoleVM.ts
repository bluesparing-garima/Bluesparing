import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IRoles, IRolesVM } from "../../components/Admin/Role/IRole";

const convertIRoleToIRoleVM = (data: IRoles): IRolesVM => {
  const roleViewModel: IRolesVM = {
    id: data._id ? data._id : "",
    roleName: data.roleName ? data.roleName : "",
    isActive: data.isActive ? data.isActive : true,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return roleViewModel;
};

export default convertIRoleToIRoleVM;
