import { GetBookingRequestProps } from "../getBookingRequestTypes";
import GetRmLeadAPI from "./GetRmLeadAPI";


const GetRmLeadService = async ({ header, rmId, signal }: GetBookingRequestProps):Promise<any> => {
  try {
    const res = await GetRmLeadAPI({
      header: header, rmId, signal
    })
    return res;
  } catch (error) {
    throw error;}

};

export default GetRmLeadService;