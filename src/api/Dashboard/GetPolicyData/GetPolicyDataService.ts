import GetPolicyDataAPI from "./GetPolicyDataAPI";
import { getPolicyProps } from "../getDashbaordTypes";

const GetPolicyDataService = async ({ header, filter }: getPolicyProps):Promise<any> => {
  try {
    const res = await GetPolicyDataAPI({
      header: header,
      filter: filter,
    })
    return  res;
  } catch (error) {
    throw error
  }
  
};

export default GetPolicyDataService;
