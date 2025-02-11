import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getAdminDashboardProps } from "../getDashboardTypes";

const getAdminDashboardAPI = async ({
  header,
  startDate,
  endDate
}: getAdminDashboardProps) => {
  const url = endpoint(startDate, endDate!)
  const options: FetchOptions = {
    method: "GET",
    headers: header
  }
  return fetchInterceptor(url, options)

};

export default getAdminDashboardAPI;
