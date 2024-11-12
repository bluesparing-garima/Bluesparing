import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getLeadByPartnerIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByPartnerIdProps } from "../getLeadsTypes";

const getLeadByPartnerIdAPI = async ({
  header,
  partnerId,
}: GetLeadByPartnerIdProps) => {
  const url = endpoint(partnerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getLeadByPartnerIdAPI;
