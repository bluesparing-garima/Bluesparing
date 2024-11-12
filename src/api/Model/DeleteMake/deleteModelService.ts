import deleteModelAPI from "./deleteModelAPI";
import { DeleteModelProps } from "../getModelsTypes";

const deleteModelService = async ({
  header,
  modelId,
  models,
}: DeleteModelProps):Promise<any> => {

  try {
    await deleteModelAPI({
      header,
      modelId,
      models,
    })
    const deletedModelIndex = models.findIndex((model) => model._id === modelId);
    models.splice(deletedModelIndex, 1);
    return models;

  } catch (error) {
    throw error
  }

};

export default deleteModelService;
