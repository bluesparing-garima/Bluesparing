import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingRequestByOperationIdEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestByOperationIdProps } from "../getBookingRequestTypes";

const getBookingRequestByOperationIdAPI = async ({
  header,
  userId,
}: GetBookingRequestByOperationIdProps) => {
  const url = endpoint(userId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBookingRequestByOperationIdAPI;
