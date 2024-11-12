import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyPDFEndpoint as endpoint } from "../apiEndpoints";
import { GetMotorPoliciesPDFProps } from "../getPoliciesTypes";

const motorPolicyPDFAPI = async ({ header, file }: GetMotorPoliciesPDFProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: file,
  }
  return fetchInterceptor(url, options)

};

export default motorPolicyPDFAPI;
