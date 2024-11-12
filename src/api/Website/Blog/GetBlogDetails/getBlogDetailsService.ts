import getBlogDetailsAPI from "./getBlogDetailsAPI";
import { GetBlogDetailsProps } from "../getBlogTypes";
import convertIBlogToIBlogVM from "../convertIBlogToIBlogVM";

const getBlogDetailsService = async ({
  header,
  blogId,
}: GetBlogDetailsProps): Promise<any> => {
  try {
    const res = await getBlogDetailsAPI({
      header: header,
      blogId: blogId,
    })
    return convertIBlogToIBlogVM(res)
  } catch (error) {
    throw error
  }

};

export default getBlogDetailsService;
