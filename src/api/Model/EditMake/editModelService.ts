import editModelAPI from "./editModelAPI";
import { AddEditModelProps } from "../getModelsTypes";

const editModelService = async ({ header, model }: AddEditModelProps): Promise<any> => {
  try {
    const res = await editModelAPI({
      header,
      model,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editModelService;
