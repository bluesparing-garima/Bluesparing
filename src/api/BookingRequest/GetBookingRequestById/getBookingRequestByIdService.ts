import getBookingRequestByIdAPI from "./getBookingRequestByIdAPI";
import { GetBookingRequestByIdProps } from "../getBookingRequestTypes";

const getBookingRequestByIdService = async ({
  header,
  bookingRequestId,
}: GetBookingRequestByIdProps): Promise<any>  => {
  try {
    const resData = await getBookingRequestByIdAPI({
      header: header,
      bookingRequestId: bookingRequestId,
    })
    return resData
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default getBookingRequestByIdService;
