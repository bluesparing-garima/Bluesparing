import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { editBlogEndpoint as endpoint } from "../apiEndpoints";
import { AddEditBlogProps } from "../getBlogTypes";

const editBlogAPI = async ({ header, blog,blogId }: AddEditBlogProps) => {
  const url = endpoint(blogId!)
  const options: FetchOptions = {
    method: "PUT",
    body: blog,
  }

  return fetchInterceptor(url, options)

};

export default editBlogAPI;
