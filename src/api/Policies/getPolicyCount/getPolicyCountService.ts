import { getPolicyCountProps } from "../getPoliciesTypes";
import getPolicyCountAPI from "./getPolicyCountAPI";

const getPolicyService = async ({ userId }: getPolicyCountProps): Promise<any> => {
  try {
    const res = await getPolicyCountAPI({
      userId: userId
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default getPolicyService;
