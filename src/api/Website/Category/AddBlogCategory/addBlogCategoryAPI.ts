import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { addBlogCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditBlogCategoryProps } from "../getBlogCategoryTypes";

const addBlogCategoryAPI = async ({
  header,
  category,
}: AddEditBlogCategoryProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...category,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addBlogCategoryAPI;
