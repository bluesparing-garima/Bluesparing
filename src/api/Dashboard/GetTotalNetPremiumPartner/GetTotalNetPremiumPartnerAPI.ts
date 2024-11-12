import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalNetPremiumPartnerEndpoint as endpoint } from "../apiEndPoints";
import { getTotalPartnerPaymentProps } from "../getDashboardTypes";

const GetTotalNetPremiumPartnerAPI = async ({
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

export default GetTotalNetPremiumPartnerAPI