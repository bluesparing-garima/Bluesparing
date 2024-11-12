import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCategoryProps } from "../getCategoryTypes";

const addCategoryAPI = async ({ header, category }: AddEditCategoryProps) => {
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

export default addCategoryAPI;
