import editProductSubTypeAPI from "./editProductSubTypeAPI";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const editProductSubTypeService = async ({ header, productSubType }: AddEditProductSubTypeProps): Promise<any> => {
  try {
    const res = await editProductSubTypeAPI({
      header,
      productSubType,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editProductSubTypeService;
