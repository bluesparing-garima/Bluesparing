import { IBlogCategories } from "../../../../components/Website/BlogCategory/IBlogCategory";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getBlogCategorytDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetBlogCategoryDetailsProps } from "../getBlogCategoryTypes";

const getBlogCategoryDetailsAPI = async ({ header, categoryId }: GetBlogCategoryDetailsProps) => {
  const url = endpoint(categoryId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor<IBlogCategories>(url, options)

};

export default getBlogCategoryDetailsAPI;
