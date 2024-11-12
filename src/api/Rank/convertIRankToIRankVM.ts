import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IRanks, IRanksVM } from "../../components/Admin/Rank/IRank";

const convertIRankToIRankVM = (data: IRanks): IRanksVM => {
  const rankViewModel: IRanksVM = {
    id: data._id ? data._id : "",
    rank: data.rank ? data.rank : "",
    count: data.count ? data.count : 0,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return rankViewModel;
};

export default convertIRankToIRankVM;
