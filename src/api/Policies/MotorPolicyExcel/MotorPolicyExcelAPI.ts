import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { motorPolicyExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetMotorPolicyExcelProps } from "../getPoliciesTypes";

const MotorPolicyExcelAPI = async ({
  header,
  excel,
}: GetMotorPolicyExcelProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: excel,
  }
  return fetchInterceptor(url, options)

};

export default MotorPolicyExcelAPI;
