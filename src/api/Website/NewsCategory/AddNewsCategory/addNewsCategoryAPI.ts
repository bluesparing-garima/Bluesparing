import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { addNewsCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditNewsCategoryProps } from "../getNewsCategoryTypes";

const addNewsCategoryAPI = async ({
  header,
  category,
}: AddEditNewsCategoryProps) => {
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

export default addNewsCategoryAPI;
