import deleteRankAPI from "./deleteRankAPI";
import { DeleteRankProps } from "../getRanksTypes";

const deleteRankService = async ({
  header,
  rankId,
  ranks,
}: DeleteRankProps): Promise<any> => {
  try {
    await deleteRankAPI({
      header,
      rankId,
      ranks,
    })
    const deletedRankIndex = ranks.findIndex((rank) => rank._id === rankId);
    ranks.splice(deletedRankIndex, 1);
    return ranks;
  } catch (error) {
    throw error
  }

};

export default deleteRankService;
