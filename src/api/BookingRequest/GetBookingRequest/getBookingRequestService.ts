import getBookingRequestAPI from "./getBookingRequestAPI";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const getBookingRequestService = async ({ header }: GetBookingRequestProps): Promise<any>  => {
  try {
    const resData = await getBookingRequestAPI({
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

export default getBookingRequestService;
