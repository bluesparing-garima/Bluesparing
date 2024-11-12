import dayjs from "dayjs";
import { ICaseTypes, ICaseTypesVM } from "../../components/Admin/CaseType/ICaseTypes";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
const convertICaseTypeToICaseTypeVM = (data: ICaseTypes): ICaseTypesVM => {
  const caseTypeViewModel: ICaseTypesVM = {
    id: data._id ? data._id : "",
    caseType: data.caseType ? data.caseType : "",
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
  return caseTypeViewModel;
};
export default convertICaseTypeToICaseTypeVM;
