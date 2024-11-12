import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editPolicyPaymentEndpoint as endpoint } from "../apiEndpoints";
import { EditPolicyPaymentProps } from "../getPoliciesPaymentTypes";

const editMotorPolicyPaymentAPI = async ({
  header,
  policyPayment,
}: EditPolicyPaymentProps) => {
  const url = endpoint(policyPayment.policyId!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...policyPayment,
    }),
  }
  return fetchInterceptor(url, options)

};

export default editMotorPolicyPaymentAPI;
