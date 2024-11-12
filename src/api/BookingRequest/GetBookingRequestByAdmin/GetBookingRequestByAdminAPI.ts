import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingRequestAdminEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const GetBookingRequestByAdminAPI = async ({ header }: GetBookingRequestProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetBookingRequestByAdminAPI;