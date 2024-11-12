
import dayjs from "dayjs";
import { IFuelTypes, IFuelTypesVM } from "../../components/Admin/FuelType/IFuelTypes";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

const convertIFuelTypeToIFuelTypeVM = (data: IFuelTypes): IFuelTypesVM => {
  const fuelTypeViewModel: IFuelTypesVM = {
    id: data._id ? data._id : "",
    fuelType: data.fuelType ? data.fuelType : "",
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
  return fuelTypeViewModel;
};

export default convertIFuelTypeToIFuelTypeVM;
