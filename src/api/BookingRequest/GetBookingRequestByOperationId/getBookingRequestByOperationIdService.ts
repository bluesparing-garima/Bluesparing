import getBookingRequestByOperationIdAPI from "./getBookingRequestByOperationIdAPI";
import { GetBookingRequestByOperationIdProps } from "../getBookingRequestTypes";

const getBookingRequestByOperationIdService = async ({
  header,
  userId,
}: GetBookingRequestByOperationIdProps): Promise<any>  => {
  try {
    const resData = await getBookingRequestByOperationIdAPI({
      header: header,
      userId: userId,
    })
    return resData
  } catch (error) {
    throw error;}
 
};

export default getBookingRequestByOperationIdService;
