import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTotalPartnerPaymentEndpoint as endpoint } from "../apiEndPoints";
import { getTotalPartnerPaymentProps } from "../getDashboardTypes";

const GetTotalPartnerPaymentAPI = async ({
  header,
  category,
}: getTotalPartnerPaymentProps) => {
  const url = endpoint(category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default GetTotalPartnerPaymentAPI;
