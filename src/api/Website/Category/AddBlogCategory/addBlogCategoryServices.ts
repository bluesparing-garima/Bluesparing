import addBlogCategoryAPI from "./addBlogCategoryAPI";
import { AddEditBlogCategoryProps } from "../getBlogCategoryTypes";

const addBlogCategoryServices = async ({
  header,
  category,
}: AddEditBlogCategoryProps): Promise<any> => {
  try {
    const res = await addBlogCategoryAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default addBlogCategoryServices;
