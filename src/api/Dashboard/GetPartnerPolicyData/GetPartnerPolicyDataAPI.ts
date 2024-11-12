import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPartnerPolicyDataEndpoint as endpoint } from "../apiEndPoints";
import { getPartnerCommissionProps } from "../getDashbaordTypes";

const GetPartnerPolicyDataAPI = async ({
  header,
  filter,
  partnerId,
}: getPartnerCommissionProps) => {
  const url = endpoint(partnerId,filter)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default GetPartnerPolicyDataAPI;
