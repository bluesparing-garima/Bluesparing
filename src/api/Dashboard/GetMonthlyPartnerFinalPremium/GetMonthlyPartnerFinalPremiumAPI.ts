import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyPartnerFinalPremiumEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyBrokerFinalPaymentProps } from "../getDashbaordTypes";

const GetMonthlyPartnerFinalPremiumAPI = async ({
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

export default GetMonthlyPartnerFinalPremiumAPI;
