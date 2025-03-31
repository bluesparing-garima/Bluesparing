import { GetBookingRequestProps } from "../getBookingRequestTypes";
import RmRequestedBookingAPI from "./GetRmReqBookingAPI";

const GetRmReqBookingService = async ({ header, rmId, signal }: GetBookingRequestProps): Promise<any> => {

  try {
    const res = await RmRequestedBookingAPI({
      header: header, rmId, signal
    })
    return res;
  } catch (error) {
    throw error;}

};

export default GetRmReqBookingService;