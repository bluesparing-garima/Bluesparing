import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteCategoryEndpoint as endpoint } from "../apiEndpoints";
import { DeleteCategoryProps } from "../getCategoryTypes";

const deleteCategoryAPI = async ({
  header,
  categoryId,
}: DeleteCategoryProps) => {

  const url = endpoint(categoryId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)


};

export default deleteCategoryAPI;
