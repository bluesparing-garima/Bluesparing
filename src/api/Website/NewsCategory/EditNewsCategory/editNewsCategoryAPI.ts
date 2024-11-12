import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { editNewsCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditNewsCategoryProps } from "../getNewsCategoryTypes";

const editNewsCategoryAPI = async ({ header, category }: AddEditNewsCategoryProps) => {
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

export default editNewsCategoryAPI;
