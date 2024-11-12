import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyDataByPolicyNumber as endpoint } from "../apiEndpoints";
import { GetPolicyByNumberProps } from "../getPoliciesTypes";

const getPolicyDataByPolicyNumberAPI = async ({
  header,
  policyNumber,
}: GetPolicyByNumberProps) => {
  const url = endpoint(policyNumber)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPolicyDataByPolicyNumberAPI;
