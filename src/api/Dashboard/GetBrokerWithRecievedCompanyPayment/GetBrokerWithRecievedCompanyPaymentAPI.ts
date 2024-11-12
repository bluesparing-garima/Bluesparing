import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBrokerPaymentWithRecievedCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getBrokerCompanyPaymentProps } from "../getDashbaordTypes";

const GetBrokerWithRecievedCompanyPaymentAPI = async ({
  header,
  brokerId,category
}: getBrokerCompanyPaymentProps) => {
  const url = endpoint(brokerId,category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetBrokerWithRecievedCompanyPaymentAPI;
