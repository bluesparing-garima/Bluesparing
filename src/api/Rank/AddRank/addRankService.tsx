import addRankAPI from "./addRankAPI";
import { AddEditRankProps } from "../getRanksTypes";

const addRankService = async ({
  header,
  rank,
}: AddEditRankProps): Promise<any> => {
  try {
    const res = addRankAPI({
      header: header,
      rank: rank,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default addRankService;
