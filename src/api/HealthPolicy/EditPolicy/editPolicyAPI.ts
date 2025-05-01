import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
// import { editPolicyEndpoint as endpoint } from "../apiEndpoints";
import { editPolicyEndpoint as endpoint } from "../../Policies/apiEndpoints";
// import { EditPolicyProps } from "../getPoliciesTypes";
import { EditPolicyProps } from "../../Policies/getPoliciesTypes";

const editHealthPolicyAPI = async ({ header, policy, policyId }: EditPolicyProps) => {
  const url = endpoint(policyId!)
  const options: FetchOptions= {
    method: "PUT",
    body: policy,
  }
  return fetchInterceptor(url, options)
 
};

export default editHealthPolicyAPI;
