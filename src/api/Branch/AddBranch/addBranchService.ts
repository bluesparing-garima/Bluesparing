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
    throw error;}

};

export default addBranchService;
