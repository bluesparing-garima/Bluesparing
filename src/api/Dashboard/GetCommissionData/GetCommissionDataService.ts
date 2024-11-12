import GetCommissionDataAPI from "./GetCommissionDataAPI";
import { getCommissionProps } from "../getDashbaordTypes";

const GetCommissionDataService = async ({ header, filter }: getCommissionProps):Promise<any> => {
  try {
    const res = await GetCommissionDataAPI({
      header: header,
      filter: filter
    })
    return res
  } catch (error) {
    throw error
  }

};

export default GetCommissionDataService;
