import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTotalBrokerLeftDistributedPaymentEndpoint as endpoint } from "../apiEndPoints";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetBrokerLeftDistributedPaymentAPI = async ({ header, category }: getTotalBrokerPaymentProps) => {
  const url = endpoint(category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetBrokerLeftDistributedPaymentAPI;
