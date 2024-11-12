import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getBlogCategoryEndpoint as endpoint } from "../apiEndpoints";
import { GetBlogCategoryProps } from "../getBlogCategoryTypes";

const getBlogCategoriesAPI = async ({ header }: GetBlogCategoryProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBlogCategoriesAPI;
