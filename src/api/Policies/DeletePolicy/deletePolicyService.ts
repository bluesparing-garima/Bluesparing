import deletePolicyAPI from "./deletePolicyAPI";
import { DeletePolicyProps } from "../getPoliciesTypes";

const deletePolicyService = async ({
  header,
  policyId,
  policies,
}: DeletePolicyProps) => {
  try {
    await deletePolicyAPI({
      header,
      policyId,
      policies,
    })
    const deletedPolicyIndex = policies.findIndex(
      (policy: any) => policy._id === policyId
    );

    policies.splice(deletedPolicyIndex, 1);
    return policies;
  } catch (error) {
    throw error
  }

};

export default deletePolicyService;
