import getPolicyByIdAPI from "./getPolicyByIdAPI";
import { GetPolicyByIdProps } from "../getPoliciesTypes";

const getPolicyByIdService = async ({
  header,
  policyId,
}: GetPolicyByIdProps): Promise<any> => {
  try {
    const res = await getPolicyByIdAPI({
      header: header,
      policyId: policyId,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default getPolicyByIdService;
