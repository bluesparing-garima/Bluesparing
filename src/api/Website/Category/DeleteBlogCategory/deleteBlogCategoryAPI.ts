import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { deleteBlogCategoryEndpoint as endpoint } from "../apiEndpoints";
import { DeleteBlogCategoryProps } from "../getBlogCategoryTypes";
const deleteBlogCategoryAPI = async ({
  header,
  categoryId,
}: DeleteBlogCategoryProps) => {
  const url = endpoint(categoryId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default deleteBlogCategoryAPI;
