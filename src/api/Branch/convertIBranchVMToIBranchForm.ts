// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IBranchForm, IBranchesVM } from "../../components/Admin/Branch/IBranch";

export const convertIBranchVMToIBranchForm = (branch: IBranchesVM): IBranchForm => {
  const branchForm: IBranchForm = {
    id: branch.id!,
    branchName: branch.branchName!,
    updatedBy: branch.updatedBy!,
    isActive: !!branch.isActive,
    createdBy: branch.createdBy!,
    // points: branch.points
    //   ? convertLocaleStringToNumber(branch.points!)
    //   : 0,
  };
  return branchForm;
};

