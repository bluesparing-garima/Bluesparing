import dayjs from "dayjs";
import {
  IProductSubTypes,
  IProductSubTypesVM,
} from "../../components/Admin/ProductSubType/IProductSubTypes";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

const convertIProductSubTypeToIProductSubTypeVM = (
  data: IProductSubTypes
): IProductSubTypesVM => {
  const productSubTypeViewModel: IProductSubTypesVM = {
    id: data._id ? data._id : "",
    productId: data.productId ? data.productId : "",
    productName: data.productName ? data.productName : "",
    productSubType: data.productSubType ? data.productSubType : "",
    createdBy: data.createdBy ? data.createdBy : "",
    isActive: data.isActive ? data.isActive : false,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return productSubTypeViewModel;
};

export default convertIProductSubTypeToIProductSubTypeVM;
