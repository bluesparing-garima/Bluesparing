import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const addPolicyTypeAPI = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...policyType,
    }),
  }
  return fetchInterceptor(url, options)

};

export default addPolicyTypeAPI;
