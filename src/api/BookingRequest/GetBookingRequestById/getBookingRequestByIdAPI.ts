import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingRequestByIdEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestByIdProps } from "../getBookingRequestTypes";

const getBookingRequestByIdAPI = async ({ header, bookingRequestId }: GetBookingRequestByIdProps) => {
  const url = endpoint(bookingRequestId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBookingRequestByIdAPI;
