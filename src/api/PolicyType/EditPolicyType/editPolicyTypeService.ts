import { AddEditPolicyTypeProps } from "../getPolicyTypes";
import editPolicyTypeAPI from "./editPolicyTypeAPI";

const editPolicyTypeService = async ({ header, policyType }: AddEditPolicyTypeProps): Promise<any> => {

  try {
    const res = await editPolicyTypeAPI({
      header,
      policyType,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editPolicyTypeService;
