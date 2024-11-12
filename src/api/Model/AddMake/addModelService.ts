import addModelAPI from "./addModelAPI";
import { AddEditModelProps } from "../getModelsTypes";

const addModelService = async ({ header, model }: AddEditModelProps):Promise<any> => {
  try {
    const res = await addModelAPI({
      header: header,
      model: model,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addModelService;
