import acceptBookingRequestAPI from "./acceptBookingRequestAPI";
import { AcceptBookingRequestProps } from "../getBookingRequestTypes";

const acceptBookingRequestService = async ({
  header,
  bookingRequest,
  bookingId,
}: AcceptBookingRequestProps): Promise<any> => {

  try {
    const resData = await acceptBookingRequestAPI({
      header,
      bookingRequest,
      bookingId,
    })
    return resData
  } catch (error) {
    throw error;}


};

export default acceptBookingRequestService;
