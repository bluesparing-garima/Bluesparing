import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IBranches, IBranchesVM } from "../../components/Admin/Branch/IBranch";

const convertIBranchToIBranchVM = (data: IBranches): IBranchesVM => {
  const branchViewModel: IBranchesVM = {
    id: data._id ? data._id : "",
    branchName: data.branchName ? data.branchName : "",
    createdBy: data.createdBy ? data.createdBy : "",
    isActive: data.isActive ? data.isActive : true,
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return branchViewModel;
};

export default convertIBranchToIBranchVM;
