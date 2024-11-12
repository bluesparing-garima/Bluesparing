import getBranchesAPI from "./getBranchesAPI";
import { GetBranchProps } from "../getBranchTypes";

const getBranchService = async ({ header }: GetBranchProps): Promise<any>  => {
  try {
    const resData = await getBranchesAPI({
      header: header,
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

export default getBranchService;
