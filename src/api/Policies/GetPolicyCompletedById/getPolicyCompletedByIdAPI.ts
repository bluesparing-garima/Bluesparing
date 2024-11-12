import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyCompletedByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyCompletedByIdProps } from "../getPoliciesTypes";

const getPolicyCompletedByIdAPI = async ({
  header,
  policyCompletedById,
  startDate,
  endDate,
}: GetPolicyCompletedByIdProps) => {
  const url = endpoint(policyCompletedById, startDate!, endDate!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPolicyCompletedByIdAPI;
