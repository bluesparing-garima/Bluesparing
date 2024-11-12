import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalNetPremiumBrokerCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getBrokerCompanyPaymentProps } from "../getDashbaordTypes";

const GetTotalNetPremiumBrokerCompanyAPI = async ({
  header,
  brokerId,
  category,
}: getBrokerCompanyPaymentProps) => {
  const url = endpoint(category, brokerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default GetTotalNetPremiumBrokerCompanyAPI;