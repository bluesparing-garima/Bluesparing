import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getNotificationByRoleProps } from "../getNotificationTypes";
import { getNotificationByRoleEndpoint as endpoint } from "../apiEndpoints";


const GetNotificationByRoleAPI = async ({ header, role, type, isView }: getNotificationByRoleProps) => {
  const url = endpoint(role, type, isView)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetNotificationByRoleAPI;
