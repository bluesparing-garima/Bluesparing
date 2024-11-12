import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deletePolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeletePolicyTypeProps } from "../getPolicyTypes";

const deletePolicyTypeAPI = async ({ header, policyTypeId }: DeletePolicyTypeProps) => {
  const url = endpoint(policyTypeId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default deletePolicyTypeAPI;
