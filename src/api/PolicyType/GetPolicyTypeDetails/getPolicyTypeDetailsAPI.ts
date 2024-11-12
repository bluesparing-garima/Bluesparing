import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyTypeDetailsProps } from "../getPolicyTypes";

const getPolicyTypeDetailsAPI = async ({ header, policyTypeId }: GetPolicyTypeDetailsProps) => {
  const url = endpoint(policyTypeId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default getPolicyTypeDetailsAPI;
