import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getBookingDashboardProps } from "../getDashbaordTypes";

const getBookingDashboardAPI = async ({
  header,
  bookingUserId,
  startDate,
  endDate,
}: getBookingDashboardProps) => {
  const url = endpoint(bookingUserId, startDate, endDate)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default getBookingDashboardAPI;
