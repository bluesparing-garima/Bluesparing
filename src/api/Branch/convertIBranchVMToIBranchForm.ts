import { IBranchForm, IBranchesVM } from "../../components/Admin/Branch/IBranch";
export const convertIBranchVMToIBranchForm = (branch: IBranchesVM): IBranchForm => {
  const branchForm: IBranchForm = {
    id: branch.id!,
    branchName: branch.branchName!,
    updatedBy: branch.updatedBy!,
    isActive: !!branch.isActive,
    createdBy: branch.createdBy!,
  };
  return branchForm;
};
