import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const editPolicyTypeAPI = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  const url = endpoint(policyType.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...policyType,
    }),
  }
  return fetchInterceptor(url, options)

};

export default editPolicyTypeAPI;
