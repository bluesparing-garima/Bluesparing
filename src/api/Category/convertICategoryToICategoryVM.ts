import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { ICategories, ICategoriesVM } from "../../components/Admin/Category/ICategory";

const convertICategoryToICategoryVM = (data: ICategories): ICategoriesVM => {
  const categoryViewModel: ICategoriesVM = {
    id: data._id ? data._id : "",
    categoryName: data.categoryName ? data.categoryName : "",
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return categoryViewModel;
};

export default convertICategoryToICategoryVM;
