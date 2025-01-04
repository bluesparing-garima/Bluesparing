import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyProps } from "../getPoliciesTypes";

const addPolicyAPI = async ({ header, policy }: AddPolicyProps) => {

  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: policy,
  }
  return fetchInterceptor(url, options)

};

export default addPolicyAPI;
