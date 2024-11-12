import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { acceptBookingRequest as endpoint } from "../apiEndPoints";
import { AcceptBookingRequestProps } from "../getBookingRequestTypes";

const acceptBookingRequestAPI = async ({
  header,
  bookingRequest,
  bookingId,
}: AcceptBookingRequestProps) => {
  const url = endpoint(bookingId)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ ...bookingRequest }),
  }

  return fetchInterceptor(url, options)

};

export default acceptBookingRequestAPI;
