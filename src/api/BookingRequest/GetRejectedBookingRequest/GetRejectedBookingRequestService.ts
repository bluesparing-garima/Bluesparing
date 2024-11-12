
import { GetBookingRequestProps } from "../getBookingRequestTypes";
import GetRejectedBookingRequestAPI from "./GetRejectedBookingRequestAPI";

const GetRejectedBookingRequestService = async ({ header }: GetBookingRequestProps): Promise<any>  => {
  try {
    const resData = await GetRejectedBookingRequestAPI({
      header: header,
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

export default GetRejectedBookingRequestService;