import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBrokerPaymentWithLeftDistributedCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithLeftDistributedCompanyPaymentAPI = async ({
  header,
  brokerId,category
}: getBrokerCompanyPaymentProps):Promise<any> => {
  const url = endpoint(brokerId,category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetBrokerWithLeftDistributedCompanyPaymentAPI;
