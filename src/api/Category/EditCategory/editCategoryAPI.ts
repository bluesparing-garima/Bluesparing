import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCategoryProps } from "../getCategoryTypes";

const editCategoryAPI = async ({ header, category }: AddEditCategoryProps) => {

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

export default editCategoryAPI;
