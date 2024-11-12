import { IModelForm, IModelsVM } from "../../components/Admin/Model/IModel";
export const convertIModelVMToIModelForm = (model: IModelsVM): IModelForm => {
  const modelForm: IModelForm = {
    id: model.id!,
    makeId: model.makeId!,
    makeName: model.makeName!,
    modelName: model.modelName!,
    updatedBy: model.updatedBy!,
    isActive: !!model.isActive,
    createdBy: model.createdBy!,
  };
  return modelForm;
};
