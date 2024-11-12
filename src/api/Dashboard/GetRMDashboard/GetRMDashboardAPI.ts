import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRmDashboardEndpoints as endpoint } from "../apiEndPoints";
import { getAccountDashboardProps } from "../getDashboardTypes";

const GetRMDashboardAPI = async ({
  header,
  startDate,
  endDate, rmId
}: getAccountDashboardProps) => {
  const url = endpoint(startDate, endDate,rmId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default GetRMDashboardAPI;
