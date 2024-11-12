import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalFinalNetPremiumBrokerEndpoint as endpoint } from "../apiEndPoints";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetTotalFinalNetPremiumBrokerAPI = async ({
  header,
  category,
}: getTotalBrokerPaymentProps) => {
  const url = endpoint(category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default GetTotalFinalNetPremiumBrokerAPI