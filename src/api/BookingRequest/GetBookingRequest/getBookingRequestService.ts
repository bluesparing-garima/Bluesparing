import getBookingRequestAPI from "./getBookingRequestAPI";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const getBookingRequestService = async ({ header }: GetBookingRequestProps): Promise<any>  => {
  try {
    const resData = await getBookingRequestAPI({
      header: header,
    })
    return resData
  } catch (error) {
    throw error;}
  
};

export default getBookingRequestService;
