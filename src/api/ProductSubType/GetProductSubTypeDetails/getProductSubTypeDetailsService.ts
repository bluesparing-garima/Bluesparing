import getProductSubTypeDetailsAPI from "./getProductSubTypeDetailsAPI";
import { GetProductSubTypeDetailsProps } from "../getProductSubTypes";
import convertIProductSubTypeToIProductSubTypeVM from "../convertIProductSubTypeToIProductSubTypeVM";
import { IProductSubTypes, IProductSubTypesVM } from "../../../components/Admin/ProductSubType/IProductSubTypes";
import { IResponse } from "../../IResponse";

const getProductSubTypeDetailsService = async ({
  header,
  productSubTypeId,
}: GetProductSubTypeDetailsProps): Promise<IProductSubTypesVM> => {
  try {
    const res = await getProductSubTypeDetailsAPI({
      header: header,
      productSubTypeId: productSubTypeId,
    })as IResponse<IProductSubTypes>
    return convertIProductSubTypeToIProductSubTypeVM(res.data)
  } catch (error) {
    throw error
  }

};

export default getProductSubTypeDetailsService;
