import editProductAPI from "./editProductAPI";
import { AddEditProductProps } from "../getProductsTypes";

const editProductService = async ({ header, product }: AddEditProductProps): Promise<any> => {
  try {
    const res = await editProductAPI({
      header,
      product,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editProductService;
