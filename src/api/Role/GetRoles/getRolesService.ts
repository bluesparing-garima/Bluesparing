import getRolesAPI from "./getRolesAPI";
import { GetRoleProps } from "../getRolesTypes";

const getRoleService = async ({ header }: GetRoleProps):Promise<any> => {
  try {
    const res = await getRolesAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getRoleService;
