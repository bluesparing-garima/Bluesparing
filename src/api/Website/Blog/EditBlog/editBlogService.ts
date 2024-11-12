import editBlogAPI from "./editBlogAPI";
import { AddEditBlogProps } from "../getBlogTypes";

const editBlogService = async ({ header, blog, blogId }: AddEditBlogProps): Promise<any> => {
  try {
    const res = await editBlogAPI({
      header,
      blog,
      blogId,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default editBlogService;
