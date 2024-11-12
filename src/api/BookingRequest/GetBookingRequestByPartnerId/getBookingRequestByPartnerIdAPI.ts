import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookingRequestbyPartnerIdEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestByPartnerIdProps } from "../getBookingRequestTypes";

const getBookingRequestByPartnerIdAPI = async ({
  header,
  partnerId,
}: GetBookingRequestByPartnerIdProps) => {
  const url = endpoint(partnerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default getBookingRequestByPartnerIdAPI;
