import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
// import { addPolicyEndpoint as endpoint } from "../apiEndpoints";
import { addHealthPolicyEndpoint as endpoint } from "../../Policies/apiEndpoints";
import { AddPolicyProps } from "../../Policies/getPoliciesTypes";

const addHealthPolicyAPI = async ({ header, policy,onProgress }: AddPolicyProps) => {

  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: policy,
    
  }
  return fetchInterceptor(url, options,onProgress)

};

export default addHealthPolicyAPI;
