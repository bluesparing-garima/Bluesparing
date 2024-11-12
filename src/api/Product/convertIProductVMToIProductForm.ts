// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IProductForm, IProductsVM } from "../../components/Admin/Product/IProduct";

export const convertIProductVMToIProductForm = (product: IProductsVM): IProductForm => {
  const productForm: IProductForm = {
    id: product.id!,
    categoryId: product.categoryId!,
    categoryName: product.categoryName!,
    productName: product.productName!,
    updatedBy: product.updatedBy!,
    isActive: !!product.isActive,
    createdBy: product.createdBy!,
  };
  return productForm;
};
