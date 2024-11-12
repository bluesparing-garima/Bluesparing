import { EditPolicyPaymentProps } from "../getPoliciesPaymentTypes";
import editMotorPolicyPaymentAPI from "./editMotorPolicyPaymentAPI";

const addMotorPolicyPaymentService = async ({
  header,
  policyPayment,
}: EditPolicyPaymentProps): Promise<any> => {
  try {
    const res = await editMotorPolicyPaymentAPI({
      header: header,
      policyPayment: policyPayment,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addMotorPolicyPaymentService;
