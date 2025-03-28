import getBranchesAPI from "./getBranchesAPI";
import { GetBranchProps } from "../getBranchTypes";

const getBranchService = async ({ header }: GetBranchProps): Promise<any>  => {
  try {
    const resData = await getBranchesAPI({
      header: header,
    })
    return resData
  } catch (error) {
    throw error;}

};

export default getBranchService;
