// convertIProductSubTypeVMToIProductSubTypeForm.ts

import { IProductSubTypeForm, IProductSubTypesVM } from "../../components/Admin/ProductSubType/IProductSubTypes";

export const convertIProductSubTypeVMToIProductSubTypeForm = (productSubType: IProductSubTypesVM): IProductSubTypeForm => {
  const productSubTypeForm: IProductSubTypeForm = {
    id: productSubType.id!,
    productId: productSubType.productId!,
    productName: productSubType.productName!,
    productSubType: productSubType.productSubType!,
    isActive: !!productSubType.isActive,
    updatedBy: productSubType.updatedBy!,
    createdBy: productSubType.createdBy!,
  };
  return productSubTypeForm;
};
 