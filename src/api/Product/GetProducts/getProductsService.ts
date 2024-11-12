import getProductsAPI from "./getProductsAPI";
import { GetProductProps } from "../getProductsTypes";

const getProductService = async ({ header }: GetProductProps): Promise<any> => {
  try {
    const res = await getProductsAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getProductService;
