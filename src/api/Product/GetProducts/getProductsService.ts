import getProductsAPI from "./getProductsAPI";
import { GetProductProps } from "../getProductsTypes";

const getProductService = async ({ header,category }: GetProductProps): Promise<any> => {
  try {
    const res = await getProductsAPI({
      header: header,category
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getProductService;
