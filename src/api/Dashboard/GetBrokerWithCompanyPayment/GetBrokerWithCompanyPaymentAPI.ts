import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBrokerPaymentWithCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithCompanyPaymentAPI = async ({
  header,
  brokerId, category
}: getBrokerCompanyPaymentProps) => {
  const url = endpoint(brokerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetBrokerWithCompanyPaymentAPI;
