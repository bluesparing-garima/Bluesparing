import getBlogAPI from "./getBlogAPI";
import { GetBlogProps } from "../getBlogTypes";

const getBlogService = async ({ header }: GetBlogProps):Promise<any> => {
  try {
    const res = await  getBlogAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error;
  }
  
};

export default getBlogService;
