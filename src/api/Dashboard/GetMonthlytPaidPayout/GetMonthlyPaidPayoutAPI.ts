import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyPaidPayoutEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyPartnerPaymentProps } from "../getDashbaordTypes";

const GetMonthlyPaidPayoutAPI = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps) => {
  const url = endpoint(startDate, endDate, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)


};

export default GetMonthlyPaidPayoutAPI;