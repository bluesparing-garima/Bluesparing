import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRecievedBrokerPaymentEndpoint as endpoint } from "../apiEndPoints";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetRecievedBrokerPaymentAPI = async ({
  header,
  category,
}: getTotalBrokerPaymentProps) => {
  const url = endpoint( category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetRecievedBrokerPaymentAPI;
