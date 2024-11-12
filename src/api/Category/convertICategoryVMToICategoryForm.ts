// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { ICategoriesVM, ICategoryForm } from "../../components/Admin/Category/ICategory";

export const convertICategoryVMToICategoryForm = (category: ICategoriesVM): ICategoryForm => {
  const categoryForm: ICategoryForm = {
    id: category.id!,
    categoryName: category.categoryName!,
    isActive: !!category.isActive,
    updatedBy: category.updatedBy!,
    createdBy: category.createdBy!,
  };
  return categoryForm;
};
