import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getAccountDashboardProps } from "../getDashbaordTypes";

const getAccountDashboardAPI = async ({
  header,
  startDate,
  endDate,
}: getAccountDashboardProps) => {

  const url = endpoint(startDate!,endDate!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getAccountDashboardAPI;
