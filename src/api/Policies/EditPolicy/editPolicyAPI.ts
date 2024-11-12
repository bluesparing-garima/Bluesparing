import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editPolicyEndpoint as endpoint } from "../apiEndpoints";
import { EditPolicyProps } from "../getPoliciesTypes";

const editPolicyAPI = async ({ header, policy, policyId }: EditPolicyProps) => {
  const url = endpoint(policyId!)
  const options: FetchOptions= {
    method: "PUT",
    body: policy,
  }
  return fetchInterceptor(url, options)
 
};

export default editPolicyAPI;
