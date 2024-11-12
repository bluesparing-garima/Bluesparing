import getBookingDashboardAPI from "./getBookingDashboardAPI";
import { getBookingDashboardProps } from "../getDashbaordTypes";

const getBookingDashboardService = async ({
  header,
  bookingUserId,startDate,endDate
}: getBookingDashboardProps): Promise<any> => {
  try {
    const res = await getBookingDashboardAPI({
      header: header,
      bookingUserId: bookingUserId,startDate,
      endDate
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getBookingDashboardService;
