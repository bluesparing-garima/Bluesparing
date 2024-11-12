import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPartnerDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getPartnerDashboardProps } from "../getDashboardTypes";

const getPartnerDashboardAPI = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: getPartnerDashboardProps) => {
  const url = endpoint(partnerId, startDate, endDate)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getPartnerDashboardAPI;
