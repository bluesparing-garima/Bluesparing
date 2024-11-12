import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalFinalNetPremiumPartnerEndpoint as endpoint } from "../apiEndPoints";
import { getTotalPartnerPaymentProps } from "../getDashbaordTypes";

const GetTotalFinalNetPremiumPartnerAPI = async ({
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

export default GetTotalFinalNetPremiumPartnerAPI