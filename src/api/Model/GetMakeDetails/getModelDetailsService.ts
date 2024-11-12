import getModelDetailsAPI from "./getModelDetailsAPI";
import { GetModelDetailsProps } from "../getModelsTypes";
import convertIModelToIModelVM from "../convertIModelToIModelVM";
import { IModels, IModelsVM } from "../../../components/Admin/Model/IModel";
import { IResponse } from "../../IResponse";

const getModelDetailsService = async ({
  header,
  modelId,
}: GetModelDetailsProps): Promise<IModelsVM> => {

  try {
    const res = await getModelDetailsAPI({
      header: header,
      modelId: modelId,
    })as IResponse<IModels>
    const models = convertIModelToIModelVM(res.data);
    return models
  } catch (error) {
    throw error
  }

};

export default getModelDetailsService;
