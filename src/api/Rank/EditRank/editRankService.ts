import editRankAPI from "./editRankAPI";
import { AddEditRankProps } from "../getRanksTypes";

const editRankService = async ({ header, rank }: AddEditRankProps):Promise<any> => {
  try {
    const res = await editRankAPI({
      header,
      rank,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editRankService;
