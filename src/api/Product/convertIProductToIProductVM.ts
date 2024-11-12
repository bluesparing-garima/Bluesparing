import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IProducts, IProductsVM } from "../../components/Admin/Product/IProduct";

const convertIProductToIProductVM = (data: IProducts): IProductsVM => {
  const productViewModel: IProductsVM = {
    id: data._id ? data._id : "",
    categoryId: data.categoryId ? data.categoryId : "",
    productName: data.productName ? data.productName : "",
    categoryName: data.categoryName ? data.categoryName : "",
    isActive: data.isActive ? data.isActive : true,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return productViewModel;
};

export default convertIProductToIProductVM;
