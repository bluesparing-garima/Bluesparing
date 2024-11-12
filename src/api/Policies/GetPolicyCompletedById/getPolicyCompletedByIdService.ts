import getPolicyCompletedByIdAPI from "./getPolicyCompletedByIdAPI";
import { GetPolicyCompletedByIdProps } from "../getPoliciesTypes";

const getPolicyCompletedByIdService = async ({
  header,
  policyCompletedById,
  startDate,
  endDate,
}: GetPolicyCompletedByIdProps): Promise<any> => {
  try {
    const res = await getPolicyCompletedByIdAPI({
      header: header,
      policyCompletedById: policyCompletedById,
      startDate,
      endDate,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getPolicyCompletedByIdService;
