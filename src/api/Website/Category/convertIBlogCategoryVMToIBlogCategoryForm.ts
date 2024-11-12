// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IBlogCategoriesVM, IBlogCategoryForm } from "../../../components/Website/BlogCategory/IBlogCategory";


export const convertIBlogCategoryVMToIBlogCategoryForm = (category: IBlogCategoriesVM): IBlogCategoryForm => {
  const categoryForm: IBlogCategoryForm = {
    id: category.id!,
    category: category.category!,
    isActive: !!category.isActive,
    updatedBy: category.updatedBy!,
    createdBy: category.createdBy!,
  };
  return categoryForm;
};
