// IFuelType.ts

export interface IFuelTypeForm {
  id?: string;
  fuelType?: string;
  isActive?:boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IFuelTypesVM {
  id?: string;
  fuelType?: string;
  isActive?:boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IFuelTypes {
  _id?: string;
  fuelType?: string;
  isActive?:boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IFuelTypeResponse {
  status: string;
  data: IFuelTypes[];
  message: string;
}

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
