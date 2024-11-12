import editFuelTypeAPI from "./editFuelTypeAPI";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const editFuelTypeService = async ({ header, fuelType }: AddEditFuelTypeProps): Promise<any> => {
  try {
    const res = await editFuelTypeAPI({
      header,
      fuelType,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editFuelTypeService;
