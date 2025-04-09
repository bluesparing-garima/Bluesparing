import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { changeStatus as endpoint } from "../apiEndpoints";
import { changePolicyStatus } from "../getPoliciesTypes";
const UpdateStatusAPI = async ({ header, status, policyId }: changePolicyStatus) => {
  const url = endpoint()
  const options: FetchOptions = {
    headers: header,
    method: "PATCH",
    body: JSON.stringify({ status, id: policyId }),
  }
  return fetchInterceptor(url, options)

};

export default UpdateStatusAPI;
