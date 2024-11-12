import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBookingRequestProps } from "../getBookingRequestTypes";

const addBookingRequestAPI = async ({
  bookingRequest,
}: AddEditBookingRequestProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: bookingRequest,
  }

  return fetchInterceptor(url, options)

};

export default addBookingRequestAPI;
