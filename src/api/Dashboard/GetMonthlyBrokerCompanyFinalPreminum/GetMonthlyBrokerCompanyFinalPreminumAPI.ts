import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyBrokerCompanyFinalPremiumEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerCompanyFinalPremiumAPI = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps) => {
  const url = endpoint(startDate, endDate, brokerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetMonthlyBrokerCompanyFinalPremiumAPI;
