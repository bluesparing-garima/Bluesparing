import getPolicyWithPaymentAPI from "./getPolicyWithPaymentAPI";
import { GetPolicyByIdProps } from "../getPoliciesTypes";

const getPolicyWithPaymentService = async ({
  header,
  policyId,
}: GetPolicyByIdProps): Promise<any> => {
  try {
    const res = await getPolicyWithPaymentAPI({
      header: header,
      policyId: policyId,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getPolicyWithPaymentService;
