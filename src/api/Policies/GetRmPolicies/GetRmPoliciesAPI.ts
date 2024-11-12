import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyByRmIdEndpoint as endpoint } from "../apiEndpoints";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const GetRmPoliciesAPI = async ({
  header,
  startDate,
  endDate, rmId
}: GetMotorPoliciesProps) => {
  const url = endpoint(startDate!, endDate!, rmId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)


};

export default GetRmPoliciesAPI;