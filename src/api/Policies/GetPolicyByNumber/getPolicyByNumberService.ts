import getPolicyByNumberAPI from "./getPolicyByNumberAPI";
import { GetPolicyByNumberProps } from "../getPoliciesTypes";

const getPolicyByNumberService = async ({
  header,
  policyNumber,
}: GetPolicyByNumberProps): Promise<any> => {
  try {
    const res = await getPolicyByNumberAPI({
      header: header,
      policyNumber: policyNumber,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default getPolicyByNumberService;
