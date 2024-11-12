import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../../context/constant";
import {
  IBlogCategories,
  IBlogCategoriesVM,
} from "../../../components/Website/BlogCategory/IBlogCategory";

const convertIBlogCategoryToICategoryVM = (
  data: IBlogCategories
): IBlogCategoriesVM => {
  const categoryViewModel: IBlogCategoriesVM = {
    id: data._id ? data._id : "",
    category: data.category ? data.category : "",
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

export default convertIBlogCategoryToICategoryVM;
