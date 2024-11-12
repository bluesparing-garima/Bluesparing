import { IBlog } from "../../../../components/Website/Blog/Blogs/IBlogs";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getBlogDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetBlogDetailsProps } from "../getBlogTypes";

const getBlogDetailsAPI = async ({ header, blogId }: GetBlogDetailsProps) => {
  const url = endpoint(blogId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor<IBlog>(url, options)

};

export default getBlogDetailsAPI;
