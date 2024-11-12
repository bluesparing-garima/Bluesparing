// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IRankForm, IRanksVM } from "../../components/Admin/Rank/IRank";

export const convertIRankVMToIRankForm = (
  rank: IRanksVM
): IRankForm => {
  const rankForm: IRankForm = {
    id: rank.id!,
    rank: rank.rank!,
    count: rank.count!,
    updatedBy: rank.updatedBy!,
    isActive: !!rank.isActive,
    createdBy: rank.createdBy!,
    // points: rank.points
    //   ? convertLocaleStringToNumber(rank.points!)
    //   : 0,
  };
  return rankForm;
};
