import editBranchAPI from "./editBranchAPI";
import { AddEditBranchProps } from "../getBranchTypes";

const editBranchService = async ({ header, branch }: AddEditBranchProps):Promise<any>  => {
  try {
    const resData = await editBranchAPI({
      header,
      branch,
    })
    return resData
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

export default editBranchService;
