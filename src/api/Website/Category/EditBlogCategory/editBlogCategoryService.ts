import editBlogCategoryAPI from "./editBlogCategoryAPI";
import { AddEditBlogCategoryProps } from "../getBlogCategoryTypes";

const editBlogCategoryService = async ({ header, category }: AddEditBlogCategoryProps): Promise<any> => {
  try {
    const res = await editBlogCategoryAPI({
      header,
      category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default editBlogCategoryService;
