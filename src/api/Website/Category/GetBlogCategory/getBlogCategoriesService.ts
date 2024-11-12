import getBlogCategoriesAPI from "./getBlogCategoriesAPI";
import { GetBlogCategoryProps } from "../getBlogCategoryTypes";

const getBlogCategoriesService = async ({ header }: GetBlogCategoryProps):Promise<any> => {
  try {
    const res = await getBlogCategoriesAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getBlogCategoriesService;
