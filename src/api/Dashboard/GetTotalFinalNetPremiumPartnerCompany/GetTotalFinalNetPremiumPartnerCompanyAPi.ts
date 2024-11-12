import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalFinalNetPremiumPartnerCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getPartnerCompanyPaymentProps } from "../getDashbaordTypes";

const GetTotalFinalNetPremiumPartnerCompanyAPI = async ({
  header,
  partnerId,
  category,
}: getPartnerCompanyPaymentProps) => {
  const url = endpoint(category, partnerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)


};

export default GetTotalFinalNetPremiumPartnerCompanyAPI;