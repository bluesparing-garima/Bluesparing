import getBookingRequestByPartnerIdAPI from "./getBookingRequestByPartnerIdAPI";
import { GetBookingRequestByPartnerIdProps } from "../getBookingRequestTypes";

const getBookingRequestByPartnerIdService = async ({
  header,
  partnerId,
}: GetBookingRequestByPartnerIdProps): Promise<any>  => {
  try {
    const resData = await getBookingRequestByPartnerIdAPI({
      header: header,
      partnerId: partnerId,
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

export default getBookingRequestByPartnerIdService;
