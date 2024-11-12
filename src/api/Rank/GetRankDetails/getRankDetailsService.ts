import getRankDetailsAPI from "./getRankDetailsAPI";
import { GetRankDetailsProps } from "../getRanksTypes";
import convertIRankToIRankVM from "../convertIRankToIRankVM";
import { IRanks, IRanksVM } from "../../../components/Admin/Rank/IRank";
import { IResponse } from "../../IResponse";

const getRankDetailsService = async ({
  header,
  rankId,
}: GetRankDetailsProps): Promise<IRanksVM> => {
  try {
    const res = await getRankDetailsAPI({
      header: header,
      rankId: rankId,
    })as IResponse<IRanks>
    return convertIRankToIRankVM(res.data)
  } catch (error) {
    throw error;
  }

};

export default getRankDetailsService;
