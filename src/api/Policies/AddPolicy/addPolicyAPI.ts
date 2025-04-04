import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyProps } from "../getPoliciesTypes";

const addPolicyAPI = async ({ header, policy,onProgress }: AddPolicyProps) => {

  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: policy,
    
  }
  return fetchInterceptor(url, options,onProgress)

};

export default addPolicyAPI;
