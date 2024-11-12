import addPolicyTypeAPI from "./addPolicyTypeAPI";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const addPolicyTypeService = async ({ header, policyType }: AddEditPolicyTypeProps): Promise<any> => {
  try {
    const res = await addPolicyTypeAPI({
      header: header,
      policyType: policyType,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addPolicyTypeService;
