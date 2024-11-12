import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { RmRequestedBookingEndPoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const RmRequestedBookingAPI = async ({ header, rmId, signal }: GetBookingRequestProps) => {
  const url = endpoint(rmId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header, signal
  }

  return fetchInterceptor(url, options)

};

export default RmRequestedBookingAPI;