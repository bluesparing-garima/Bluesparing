import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IModels, IModelsVM } from "../../components/Admin/Model/IModel";

const convertIModelToIModelVM = (data: IModels): IModelsVM => {
  const modelViewModel: IModelsVM = {
    id: data._id ? data._id : "",
    makeId: data.makeId ? data.makeId : "",
    makeName: data.makeName ? data.makeName : "",
    modelName: data.modelName ? data.modelName : "",
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
  return modelViewModel;
};

export default convertIModelToIModelVM;
