import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { deleteBlogEndpoint as endpoint } from "../apiEndpoints";
import { DeleteBlogProps } from "../getBlogTypes";

const deleteBlogAPI = async ({ header, blogId }: DeleteBlogProps) => {
  const url = endpoint(blogId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteBlogAPI;
