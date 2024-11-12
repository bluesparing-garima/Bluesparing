import deleteBranchAPI from "./deleteBranchAPI";
import { DeleteBranchProps } from "../getBranchTypes";

const deleteBranchService = async ({
  header,
  branchId,
  branches,
}: DeleteBranchProps): Promise<any>  => {
  try {
    const resData = await deleteBranchAPI({
      header,
      branchId,
      branches,
    })
    const deletedBranchIndex = branches.findIndex((branch) => branch._id === branchId);
    branches.splice(deletedBranchIndex, 1);
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

export default deleteBranchService;
