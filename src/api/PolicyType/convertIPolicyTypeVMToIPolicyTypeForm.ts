import { IPolicyTypeForm, IPolicyTypesVM } from "../../components/Admin/PolicyType/IPolicyType";
export const convertIPolicyTypeVMToIPolicyTypeForm = (policyType: IPolicyTypesVM): IPolicyTypeForm => {
  const policyTypeForm: IPolicyTypeForm = {
    id: policyType.id!,
    policyType: policyType.policyType!,
    updatedBy: policyType.updatedBy!,
    createdBy: policyType.createdBy!,
     isActive: !!policyType.isActive,
  };
  return policyTypeForm;
};
