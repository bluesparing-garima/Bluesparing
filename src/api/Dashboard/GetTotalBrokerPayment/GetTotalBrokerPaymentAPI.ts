import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTotalBrokerPaymentEndpoint as endpoint } from "../apiEndPoints";
import { getTotalBrokerPaymentProps } from "../getDashboardTypes";

const GetTotalBrokerPaymentAPI = async ({
  header,
  category,
}: getTotalBrokerPaymentProps):Promise<any> => {
  const url = endpoint( category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default GetTotalBrokerPaymentAPI;
