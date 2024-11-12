import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyBrokerFinalPremiumEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyBrokerFinalPaymentProps } from "../getDashboardTypes";

const GetMonthlyBrokerFinalPremiumAPI = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerFinalPaymentProps) => {
  const url = endpoint(startDate, endDate, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetMonthlyBrokerFinalPremiumAPI;
