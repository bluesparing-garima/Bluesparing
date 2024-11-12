import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyByPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyByPartnerIdProps } from "../getPoliciesTypes";

const getPolicyByPartnerIdAPI = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: GetPolicyByPartnerIdProps) => {
  const url = endpoint(partnerId, startDate!, endDate!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPolicyByPartnerIdAPI;
