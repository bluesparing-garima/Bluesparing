import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyEndpoint as endpoint } from "../apiEndpoints";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getMotorPolicyAPI = async ({
  header,
  startDate,
  endDate,parentAdminId
}: GetMotorPoliciesProps) => {
  const url = endpoint(startDate!,endDate!,parentAdminId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default getMotorPolicyAPI;
