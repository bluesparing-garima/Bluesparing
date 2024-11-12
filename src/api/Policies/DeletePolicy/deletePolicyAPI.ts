import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deletePolicyEndpoint as endpoint } from "../apiEndpoints";
import { DeletePolicyProps } from "../getPoliciesTypes";

const deletePolicyAPI = async ({ header, policyId }: DeletePolicyProps) => {
  const url = endpoint(policyId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default deletePolicyAPI;
