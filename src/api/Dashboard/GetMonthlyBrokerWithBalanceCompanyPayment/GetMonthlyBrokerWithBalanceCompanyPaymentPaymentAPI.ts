import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMonthlyBrokerPaymentWithBalanceCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyBrokerWithBalanceCompanyPaymentPaymentAPI = async ({
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

export default GetMonthlyBrokerWithBalanceCompanyPaymentPaymentAPI;
