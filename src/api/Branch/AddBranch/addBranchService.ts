import addBranchAPI from "./addBranchAPI";
import { AddEditBranchProps } from "../getBranchTypes";

const addBranchService = async ({ header, branch }: AddEditBranchProps): Promise<any> => {
  try {
    const resData = addBranchAPI({
      header: header,
      branch: branch,
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

export default addBranchService;
