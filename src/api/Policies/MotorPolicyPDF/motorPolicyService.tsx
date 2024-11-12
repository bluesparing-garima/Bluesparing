import motorPolicyPDFAPI from "./motorPolicyPDFAPI";
import { GetMotorPoliciesPDFProps } from "../getPoliciesTypes";

const motorPolicyPDFService = async ({
  header,
  file,
}: GetMotorPoliciesPDFProps): Promise<any> => {
  try {
    const res = await motorPolicyPDFAPI({
      header: header,
      file: file,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default motorPolicyPDFService;
