import getModelsAPI from "./getModelsAPI";
import { GetModelProps } from "../getModelsTypes";

const getModelsService = async ({ header }: GetModelProps):Promise<any> => {
  try {
    const res = await getModelsAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getModelsService;
