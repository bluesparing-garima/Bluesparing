import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMonthlyBrokerReceivedPaymentEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyBrokerPaymentProps } from "../getDashboardTypes";

const GetMonthlyBrokerReceivedPaymentAPI = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps) => {
  const url = endpoint(startDate, endDate, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetMonthlyBrokerReceivedPaymentAPI;
