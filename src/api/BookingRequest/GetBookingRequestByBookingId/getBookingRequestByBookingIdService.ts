import getBookingRequestByBookingIdAPI from "./getBookingRequestByBookingIdAPI";
import { GetBookingRequestByIdProps } from "../getBookingRequestTypes";

const getBookingRequestByBookingIdService = async ({
  header,
  bookingRequestId,
}: GetBookingRequestByIdProps): Promise<any>  => {
  try {
    const resData = await  getBookingRequestByBookingIdAPI({
      header: header,
      bookingRequestId: bookingRequestId,
    })
    return resData
  } catch (error) {
    throw error;}

};

export default getBookingRequestByBookingIdService;
