import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IMakes, IMakesVM } from "../../components/Admin/Make/IMake";

const convertIMakeToIMakeVM = (data: IMakes): IMakesVM => {
  const makeViewModel: IMakesVM = {
    id: data._id ? data._id : "",
    makeName: data.makeName ? data.makeName : "",
    isActive: data.isActive ? data.isActive : true,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return makeViewModel;
};

export default convertIMakeToIMakeVM;
