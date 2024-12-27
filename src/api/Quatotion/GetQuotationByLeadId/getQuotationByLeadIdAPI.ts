import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getQuotationByLeadIdEndpoint as endpoint } from "../apiEndpoints";
import { GetQuotationByLeadIdProps } from "../getQuotationTypes";
const getQuotationByLeadIdAPI = async ({ header, leadId }: GetQuotationByLeadIdProps) => {
  const url = endpoint(leadId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default getQuotationByLeadIdAPI;
