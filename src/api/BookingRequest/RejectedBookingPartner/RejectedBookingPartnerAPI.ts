import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { rejectedBookingPartnerEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestPartnerProps } from "../getBookingRequestTypes";

const RejectedBookingPartnerAPI = async ({ header,partnerId }: GetBookingRequestPartnerProps) => {
  const url = endpoint(partnerId)
  const options: FetchOptions = {
      method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default RejectedBookingPartnerAPI;