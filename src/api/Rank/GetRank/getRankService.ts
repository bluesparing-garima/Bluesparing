import getRanksAPI from "./getRanksAPI";
import { GetRankProps } from "../getRanksTypes";

const getRankService = async ({ header }: GetRankProps):Promise<any> => {
  try {
    const res = await  getRanksAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error;
  }
 
};

export default getRankService;
