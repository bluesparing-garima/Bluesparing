import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IPolicyTypes, IPolicyTypesVM } from "../../components/Admin/PolicyType/IPolicyType";

const convertIPolicyTypeToIPolicyTypeVM = (data: IPolicyTypes): IPolicyTypesVM => {
  const policyTypeViewModel: IPolicyTypesVM = {
    id: data._id ? data._id : "",
    policyType: data.policyType ? data.policyType : "",
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return policyTypeViewModel;
};

export default convertIPolicyTypeToIPolicyTypeVM;
