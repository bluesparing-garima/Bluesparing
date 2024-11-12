import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetMonthlyPartnerCompanyNetPremiumEndpoint as endpoint } from "../apiEndPoints";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyPartnerCompanyNetPreminumAPI = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps) => {
  const url = endpoint(startDate, endDate,partnerId, category)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetMonthlyPartnerCompanyNetPreminumAPI;
