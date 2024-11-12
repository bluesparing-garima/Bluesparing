import addBlogAPI from "./addBlogAPI";
import { AddEditBlogProps } from "../getBlogTypes";

const addBlogServices = async ({ header, blog }: AddEditBlogProps):Promise<any> => {
  try {
    const res = await  addBlogAPI({
      header: header,
      blog: blog,
    })
    return res;
  } catch (error) {
    throw error
  }
 
};

export default addBlogServices;
