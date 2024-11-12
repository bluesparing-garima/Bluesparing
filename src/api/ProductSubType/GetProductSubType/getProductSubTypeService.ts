// getProductSubTypeService.ts

import { GetProductSubTypeProps } from "../getProductSubTypes";
import getProductSubTypeAPI from "./getProductSubTypeAPI";

const getProductSubTypeService = async ({ header }: GetProductSubTypeProps):Promise<any> => {
  try {
    const res = await getProductSubTypeAPI({
      header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getProductSubTypeService;
