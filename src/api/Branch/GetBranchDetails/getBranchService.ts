import getBranchDetailsAPI from "./getBranchAPI";
import { GetBranchDetailsProps } from "../getBranchTypes";
import convertIBranchToIBranchVM from "../convertIBranchToIBranchVM";
import { IBranches, IBranchesVM } from "../../../components/Admin/Branch/IBranch";
import { IResponse } from "../../IResponse";


const getBranchDetailsService = async ({
  header,
  branchId,
}: GetBranchDetailsProps): Promise<IBranchesVM> => {
  try {
    const resData = await getBranchDetailsAPI({
      header: header,
      branchId: branchId,
    }) as IResponse<IBranches>;

    const branches = convertIBranchToIBranchVM(resData.data);
    return branches;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default getBranchDetailsService;
