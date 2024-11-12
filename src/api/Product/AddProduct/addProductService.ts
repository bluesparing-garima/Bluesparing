import addProductAPI from "./addProductAPI";
import { AddEditProductProps } from "../getProductsTypes";

const addProductService = async ({ header, product }: AddEditProductProps):Promise<any> => {
  try {
    const res = await addProductAPI({
      header: header,
      product: product,
    })
    return res;
  } catch (error) {
    throw error
  }
  
};

export default addProductService;
