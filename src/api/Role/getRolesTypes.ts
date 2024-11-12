import { Header } from "../../Auth/IAuth";
import { IRoleForm, IRoles } from "../../components/Admin/Role/IRole";

export interface AddEditRoleProps {
  header: Header;
  role: IRoleForm;
}

export interface GetRoleProps {
  header?: Header;
}

export interface GetRoleDetailsProps {
  header?: Header;
  roleId?: string;
}

export interface DeleteRoleProps {
  header?: Header;
  roleId?: string;
  roles: IRoles[];
}
export interface getAttendanceProps{
  header:any;
  eId:string;
}