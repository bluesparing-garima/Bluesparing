import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { EditBookingRequestProps } from "../getBookingRequestTypes";

const editBookingRequestAPI = async ({
  header,
  bookingRequest,
  bookingId,
}: EditBookingRequestProps) => {
  const url = endpoint(bookingId)
  const options: FetchOptions = {
    method: "PUT",
    body: bookingRequest,
  }

  return fetchInterceptor(url, options)

};

export default editBookingRequestAPI;
