import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getBlogEndpoint as endpoint } from "../apiEndpoints";
import { GetBlogProps } from "../getBlogTypes";

const getBlogAPI = async ({ header }: GetBlogProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBlogAPI;
