import { GetBookingRequestProps } from "../getBookingRequestTypes";
import GetRmLeadAPI from "./GetRmLeadAPI";


const GetRmLeadService = async ({ header, rmId, signal }: GetBookingRequestProps):Promise<any> => {
  try {
    const res = await GetRmLeadAPI({
      header: header, rmId, signal
    })
    return res;
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

export default GetRmLeadService;