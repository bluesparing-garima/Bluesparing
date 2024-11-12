import { Header } from "../../Auth/IAuth";
import { IModelForm, IModels } from "../../components/Admin/Model/IModel";

export interface AddEditModelProps {
  header: Header;
  model: IModelForm;
}

export interface GetModelProps {
  header?: Header;
}

export interface GetModelDetailsProps {
  header?: Header;
  modelId?: string;
}
export interface ValidateModelDetailsProps {
  header?: Header;
  modelName?: string;
}
export interface DeleteModelProps {
  header?: Header;
  modelId?: string;
  models: IModels[];
}
