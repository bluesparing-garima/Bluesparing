import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const getBookingRequestesAPI = async ({ header }: GetBookingRequestProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBookingRequestesAPI;
