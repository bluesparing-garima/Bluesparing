import deleteCategoryAPI from "./deleteCategoryAPI";
import { DeleteCategoryProps } from "../getCategoryTypes";

const deleteCategoryService = async ({
  header,
  categoryId,
  categories,
}: DeleteCategoryProps): Promise<any> => {
  try {
    await deleteCategoryAPI({
      header,
      categoryId,
      categories,
    })
    const deletedCategoryIndex = categories.findIndex((category) => category._id === categoryId);
    categories.splice(deletedCategoryIndex, 1);
    return categories;
  } catch (error) {
    throw error
  }

};

export default deleteCategoryService;
