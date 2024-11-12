import { EditPolicyProps } from "../getPoliciesTypes";
import editPolicyAPI from "./editPolicyAPI";

const editPolicyService = async ({
  header,
  policy,
  policyId,
}: EditPolicyProps): Promise<any> => {
  try {
    const res = await editPolicyAPI({
      header: header,
      policy: policy,
      policyId: policyId,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default editPolicyService;
