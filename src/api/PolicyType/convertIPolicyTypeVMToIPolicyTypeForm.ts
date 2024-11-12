// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IPolicyTypeForm, IPolicyTypesVM } from "../../components/Admin/PolicyType/IPolicyType";

export const convertIPolicyTypeVMToIPolicyTypeForm = (policyType: IPolicyTypesVM): IPolicyTypeForm => {
  const policyTypeForm: IPolicyTypeForm = {
    id: policyType.id!,
    policyType: policyType.policyType!,
    updatedBy: policyType.updatedBy!,
    createdBy: policyType.createdBy!,
    // points: policyType.points
    //   ? convertLocaleStringToNumber(policyType.points!)
    //   : 0,
     isActive: !!policyType.isActive,
    // createdOn: dayjs(policyType?.createdOn).format(DAYJS_DISPLAY_FORMAT),
  };
  return policyTypeForm;
};
