// convertIFuelTypeVMToIFuelTypeForm.ts

import {
  IFuelTypeForm,
  IFuelTypesVM,
} from "../../components/Admin/FuelType/IFuelTypes";

export const convertIFuelTypeVMToIFuelTypeForm = (
  fuelType: IFuelTypesVM
): IFuelTypeForm => {
  const fuelTypeForm: IFuelTypeForm = {
    id: fuelType.id!,
    fuelType: fuelType.fuelType!,
    isActive: !!fuelType.isActive,
    updatedBy: fuelType.updatedBy!,
    createdBy: fuelType.createdBy!,
  };
  return fuelTypeForm;
};
