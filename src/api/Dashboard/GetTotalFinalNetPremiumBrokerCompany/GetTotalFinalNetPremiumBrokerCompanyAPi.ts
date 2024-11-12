import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalFinalNetPremiumBrokerCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetTotalFinalNetPremiumBrokerCompanyAPI = async ({
  header,
  brokerId,
  category,
}: getBrokerCompanyPaymentProps) => {
  const url = endpoint(category,brokerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetTotalFinalNetPremiumBrokerCompanyAPI;