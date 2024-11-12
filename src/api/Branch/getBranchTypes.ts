import { Header } from "../../Auth/IAuth";
import { IBranchForm, IBranches } from "../../components/Admin/Branch/IBranch";

export interface AddEditBranchProps {
  header: Header;
  branch: IBranchForm;
}

export interface GetBranchProps {
  header?: Header;
}

export interface GetBranchDetailsProps {
  header?: Header;
  branchId?: string;
}

export interface DeleteBranchProps {
  header?: Header;
  branchId?: string;
  branches: IBranches[];
}
