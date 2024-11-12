import getRankBadgeDetailsAPI from "./getRankBadgeDetailsAPI";
import { GetRankBadgeDetailsProps } from "../getRanksTypes";
import convertIRankToIRankVM from "../convertIRankToIRankVM";

const getRankBadgeDetailsService = async ({
  header,
  partnerId,
}: GetRankBadgeDetailsProps): Promise<any> => {
  try {
    const res = await getRankBadgeDetailsAPI({
      header: header,
      partnerId: partnerId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getRankBadgeDetailsService;
