import validateModelAPI from "./validateModelAPI";
import { ValidateModelDetailsProps } from "../getModelsTypes";

const validateModelService = async ({
  header,
  modelName,
}: ValidateModelDetailsProps):Promise<any> => {
  try {
    const res = await validateModelAPI({
      header: header,
      modelName: modelName,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default validateModelService;
