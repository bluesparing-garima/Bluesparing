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

export default getBookingRequestByOperationIdService;
