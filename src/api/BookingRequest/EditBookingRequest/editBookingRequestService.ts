import editBookingRequestAPI from "./editBookingRequestAPI";
import { EditBookingRequestProps } from "../getBookingRequestTypes";

const editBookingRequestService = async ({
  header,
  bookingRequest,
  bookingId,
}: EditBookingRequestProps): Promise<any>  => {
  try {
    const resData = await  editBookingRequestAPI({
      header,
      bookingRequest,
      bookingId,
    })
    return resData
  } catch (error) {
    throw error;}
 
};

export default editBookingRequestService;
