import addProductSubTypeAPI from "./addProductSubTypeAPI";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const addProductSubTypeService = async ({ header, productSubType }: AddEditProductSubTypeProps):Promise<any> => {
  try {
    const newProductSubType = await addProductSubTypeAPI({
      header,
      productSubType,
    });
    return newProductSubType;
  } catch (error) {
    throw error
  }
};

export default addProductSubTypeService;
