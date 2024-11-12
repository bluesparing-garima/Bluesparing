import addFuelTypeAPI from "./addFuelTypeAPI";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const addFuelTypeService = async ({ header, fuelType }: AddEditFuelTypeProps):Promise<any> => {
  try {
    const newFuelType = await addFuelTypeAPI({
      header,
      fuelType,
    });
    return newFuelType;
  } catch (error) {
    throw error
  }
};

export default addFuelTypeService;
