import { getNotificationByRoleProps } from "../getNotificationTypes";
import GetNotificationByRoleAPI from "./GetNotificationByRoleAPI";

const GetNotificationByRoleService = async ({ header, role,id }: getNotificationByRoleProps): Promise<any> => {
  try {
    const res = await GetNotificationByRoleAPI({
      header: header, role,id
    })
    return res
  } catch (error) {
    throw error
  }

};

export default GetNotificationByRoleService;
