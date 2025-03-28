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
    throw error;}

};

export default editBranchService;
