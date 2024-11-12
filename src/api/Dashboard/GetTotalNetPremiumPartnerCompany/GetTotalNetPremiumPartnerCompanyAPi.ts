import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GetTotalNetPremiumPartnerCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getPartnerCompanyPaymentProps } from "../getDashbaordTypes";

const GetTotalNetPremiumPartnerCompanyAPI = async ({
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

export default GetTotalNetPremiumPartnerCompanyAPI;