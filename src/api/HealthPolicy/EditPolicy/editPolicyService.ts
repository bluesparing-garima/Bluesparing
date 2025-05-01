// import { EditPolicyProps } from "../getPoliciesTypes";
import { EditPolicyProps } from "../../Policies/getPoliciesTypes";
import editHealthPolicyAPI from "./editPolicyAPI";

const editHealthPolicyService = async ({
  header,
  policy,
  policyId,
}: EditPolicyProps): Promise<any> => {
  try {
    const res = await editHealthPolicyAPI({
      header: header,
      policy: policy,
      policyId: policyId,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default editHealthPolicyService;
