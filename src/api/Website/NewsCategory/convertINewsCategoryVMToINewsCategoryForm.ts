// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import {
  INewsCategoriesVM,
  INewsCategoryForm,
} from "../../../components/Website/NewsCategory/INewsCategory";

export const convertINewsCategoryVMToINewsCategoryForm = (
  category: INewsCategoriesVM
): INewsCategoryForm => {
  const categoryForm: INewsCategoryForm = {
    id: category.id!,
    category: category.category!,
    isActive: !!category.isActive,
    updatedBy: category.updatedBy!,
    createdBy: category.createdBy!,
  };
  return categoryForm;
};
