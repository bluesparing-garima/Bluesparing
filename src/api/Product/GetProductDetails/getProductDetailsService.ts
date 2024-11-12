import getProductDetailsAPI from "./getProductDetailsAPI";
import { GetProductDetailsProps } from "../getProductsTypes";
import convertIProductToIProductVM from "../convertIProductToIProductVM";
import { IProducts, IProductsVM } from "../../../components/Admin/Product/IProduct";
import { IResponse } from "../../IResponse";

const getProductDetailsService = async ({
  header,
  productId,
}: GetProductDetailsProps): Promise<IProductsVM> => {
  try {
    const res = await getProductDetailsAPI({
      header: header,
      productId: productId,
    })as IResponse<IProducts>

    return convertIProductToIProductVM(res.data)
  } catch (error) {
    throw error
  }

};

export default getProductDetailsService;
