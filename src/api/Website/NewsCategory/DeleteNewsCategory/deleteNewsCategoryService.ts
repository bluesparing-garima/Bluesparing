import deleteNewsCategoryAPI from "./deleteNewsCategoryAPI";
import { DeleteNewsCategoryProps } from "../getNewsCategoryTypes";

const deleteNewsCategoryService = async ({
  header,
  categoryId,
  categories,
}: DeleteNewsCategoryProps): Promise<any> => {
  try {
  await deleteNewsCategoryAPI({
      header,
      categoryId,
      categories,
    })
    const deletedCategoryIndex = categories.findIndex(
      (category) => category._id === categoryId
    );
    categories.splice(deletedCategoryIndex, 1);
    return categories;
  } catch (error) {
    throw error;
  }

};

export default deleteNewsCategoryService;
