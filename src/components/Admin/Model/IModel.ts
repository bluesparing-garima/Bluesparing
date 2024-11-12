export interface IModelForm {
  id?: string;
  makeId?: string;
  makeName?: string;
  modelName?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IModelsVM {
  id?: string;
  makeId?: string;
  makeName?: string;
  modelName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface IModels {
  _id?: string;
  makeId?: string;
  makeName?: string;
  modelName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IModel {
  status: string;
  data: IModels[];
  message: string;
}
