import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { RmLeadEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const GetRmLeadAPI = async ({ header,rmId,signal }: GetBookingRequestProps) => {
  const url = endpoint(rmId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,signal
  }

  return fetchInterceptor(url, options)

};

export default GetRmLeadAPI;