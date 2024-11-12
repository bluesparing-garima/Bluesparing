import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { addBlogEndpoint as endpoint } from "../apiEndpoints";
import { AddEditBlogProps } from "../getBlogTypes";

const addBlogAPI = async ({ blog }: AddEditBlogProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: blog,
  }

  return fetchInterceptor(url, options)
};

export default addBlogAPI;
