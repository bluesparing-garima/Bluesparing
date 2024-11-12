import { getNotificationByRoleProps } from "../getNotificationTypes";
import GetNotificationByRoleAPI from "./GetNotificationByRoleAPI";

const GetNotificationByRoleService = async ({ header, role, type, isView }: getNotificationByRoleProps): Promise<any> => {
  try {
    const res = await GetNotificationByRoleAPI({
      header: header, role, type, isView
    })
    return res
  } catch (error) {
    throw error
  }

};

export default GetNotificationByRoleService;
