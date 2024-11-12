import getBlogCategoryDetailsAPI from "./getBlogCategoryDetailsAPI";
import { GetBlogCategoryDetailsProps } from "../getBlogCategoryTypes";
import convertICategoryToICategoryVM from "../convertIBlogCategoryToICategoryVM";
import { IBlogCategoriesVM } from "../../../../components/Website/BlogCategory/IBlogCategory";

const getBlogCategoryDetailsService = async ({
  header,
  categoryId,
}: GetBlogCategoryDetailsProps): Promise<IBlogCategoriesVM> => {
  try {
    const res = await getBlogCategoryDetailsAPI({
      header: header,
      categoryId: categoryId,
    })
    return convertICategoryToICategoryVM(res)
  } catch (error) {
    throw error;
  }

};

export default getBlogCategoryDetailsService;
