import deletePolicyTypeAPI from "./deletePolicyTypeAPI";
import { DeletePolicyTypeProps } from "../getPolicyTypes";

const deletePolicyTypeService = async ({
  header,
  policyTypeId,
  policyTypes,
}: DeletePolicyTypeProps): Promise<any> => {
  try {
    await deletePolicyTypeAPI({
      header,
      policyTypeId,
      policyTypes,
    })
    const deletedPolicyTypeIndex = policyTypes.findIndex(
      (policyType) => policyType._id === policyTypeId
    );
    policyTypes.splice(deletedPolicyTypeIndex, 1);
    return policyTypes;
  } catch (error) {
    throw error
  }

};

export default deletePolicyTypeService;
