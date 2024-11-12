import deleteProductSubTypeAPI from "./deleteProductSubTypeAPI";
import { DeleteProductSubTypeProps } from "../getProductSubTypes";

const deleteProductSubTypeService = async ({ header, productSubTypeId, productSubTypes }: DeleteProductSubTypeProps): Promise<any> => {
  try {
    await deleteProductSubTypeAPI({
      header,
      productSubTypeId,
      productSubTypes,
    })
    const deletedProductSubTypeIndex = productSubTypes.findIndex((productSubType) => productSubType._id === productSubTypeId);
    productSubTypes.splice(deletedProductSubTypeIndex, 1);
    return productSubTypes;
  } catch (error) {
    throw error
  }


};

export default deleteProductSubTypeService;
