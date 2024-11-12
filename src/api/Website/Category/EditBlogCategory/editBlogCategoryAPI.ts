import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { editBlogCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditBlogCategoryProps } from "../getBlogCategoryTypes";

const editBlogCategoryAPI = async ({ header, category }: AddEditBlogCategoryProps) => {
  const url = endpoint(category.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...category,
    }),
  }

  return fetchInterceptor(url, options)

};

export default editBlogCategoryAPI;
