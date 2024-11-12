import getMotorPolicyAPI from "./getMotorPolicyAPI";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getMotorPolicyService = async ({
  header,
  startDate,
  endDate,
}: GetMotorPoliciesProps):Promise<any>=> {
  try {
    const res = await  getMotorPolicyAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
    })
    return res
  } catch (error) {
    throw error
  }
 
};

export default getMotorPolicyService;
