import getMotorPolicyAPI from "./getMotorPolicyAPI";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getMotorPolicyService = async ({
  header,
  startDate,
  endDate,parentAdminId
}: GetMotorPoliciesProps):Promise<any>=> {
  try {
    const res = await  getMotorPolicyAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,parentAdminId
    })
    return res
  } catch (error) {
    throw error
  }
 
};

export default getMotorPolicyService;
