import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyByWithPaymentEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyByIdProps } from "../getPoliciesTypes";

const getPolicyWithPaymentAPI = async ({
  header,
  policyId,
}: GetPolicyByIdProps) => {
  const url = endpoint(policyId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default getPolicyWithPaymentAPI;
