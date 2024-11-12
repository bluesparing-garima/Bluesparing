import getArchiveMotorPolicyAPI from "./getArchiveMotorPolicyAPI";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getArchiveMotorPolicyService = async ({
  header,
  startDate,
  endDate,
}: GetMotorPoliciesProps):Promise<any> => {
  try {
    const res = await getArchiveMotorPolicyAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default getArchiveMotorPolicyService;
