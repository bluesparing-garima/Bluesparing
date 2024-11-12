import addBookingRequestAPI from "./addBookingRequestAPI";
import { AddEditBookingRequestProps } from "../getBookingRequestTypes";

const addBookingRequestService = async ({ header, bookingRequest }: AddEditBookingRequestProps): Promise<any>  => {
  try {
    const resData = await  addBookingRequestAPI({
      header: header,
      bookingRequest: bookingRequest,
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

export default addBookingRequestService;
