
import {
  IFuelTypes,
  IFuelTypeForm,
} from "../../components/Admin/FuelType/IFuelTypes";

export interface AddEditFuelTypeProps {
  header: any;
  fuelType: IFuelTypeForm;
}

export interface GetFuelTypeProps {
  header?: any;
}

export interface GetFuelTypeDetailsProps {
  header?: any;
  fuelTypeId?: string;
}

export interface DeleteFuelTypeProps {
  header?: any;
  fuelTypeId?: string;
  fuelTypes: IFuelTypes[];
}
