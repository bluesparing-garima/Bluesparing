import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyPartnerCompanyFinalPremiumEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyPartnerCompanyFinalPremiumAPI = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps) => {
  const url = endpoint(startDate, endDate, partnerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetMonthlyPartnerCompanyFinalPremiumAPI;
