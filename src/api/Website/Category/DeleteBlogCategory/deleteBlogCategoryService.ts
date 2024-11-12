import deleteBlogCategoryAPI from "./deleteBlogCategoryAPI";
import { DeleteBlogCategoryProps } from "../getBlogCategoryTypes";

const deleteBlogCategoryService = async ({
  header,
  categoryId,
  categories,
}: DeleteBlogCategoryProps): Promise<any> => {
  try {
    await deleteBlogCategoryAPI({
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

export default deleteBlogCategoryService;
