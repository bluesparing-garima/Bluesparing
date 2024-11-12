import deleteBlogAPI from "./deleteBlogAPI";
import { DeleteBlogProps } from "../getBlogTypes";

const deleteBlogService = async ({
  header,
  blogId,
  blogs,
}: DeleteBlogProps): Promise<any> => {
  try {
    await deleteBlogAPI({
      header,
      blogId,
      blogs,
    })
    const deletedIndex = blogs.findIndex((blog) => blog._id === blogId);
    blogs.splice(deletedIndex, 1);
    return blogs;
  } catch (error) {
    throw error
  }

};

export default deleteBlogService;
