import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPartnerPaymentWithCompanyEndpoint as endpoint } from "../apiEndPoints";
import { getPartnerCompanyPaymentProps } from "../getDashboardTypes";

const GetPartnerWithCompanyPaymentAPI = async ({
  header,
  partnerId,
  category,
}: getPartnerCompanyPaymentProps) => {
  const url = endpoint(partnerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

 
};

export default GetPartnerWithCompanyPaymentAPI;
