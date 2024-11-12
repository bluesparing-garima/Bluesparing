import deleteFuelTypeAPI from "./deleteFuelTypeAPI";
import { DeleteFuelTypeProps } from "../getFuelTypes";

const deleteFuelTypeService = async ({ header, fuelTypeId, fuelTypes }: DeleteFuelTypeProps): Promise<any> => {
  try {
    await deleteFuelTypeAPI({
      header,
      fuelTypeId,
      fuelTypes,
    })
    const deletedFuelTypeIndex = fuelTypes.findIndex((fuelType) => fuelType._id === fuelTypeId);
    fuelTypes.splice(deletedFuelTypeIndex, 1);
    return fuelTypes;

  } catch (error) {
    throw error
  }

};

export default deleteFuelTypeService;
