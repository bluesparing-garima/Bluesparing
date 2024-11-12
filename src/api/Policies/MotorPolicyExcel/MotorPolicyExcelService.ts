import MotorPolicyExcelAPI from "./MotorPolicyExcelAPI";
import { GetMotorPolicyExcelProps } from "../getPoliciesTypes";

const MotorPolicyExcelService = async ({
  header,
  excel,
}: GetMotorPolicyExcelProps): Promise<any> => {
  try {
    const res = await MotorPolicyExcelAPI({
      header: header,
      excel: excel,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default MotorPolicyExcelService;
