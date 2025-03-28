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
    throw error;}

};

export default addBookingRequestService;
