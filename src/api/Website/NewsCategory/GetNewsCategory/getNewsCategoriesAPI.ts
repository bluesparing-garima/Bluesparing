import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getNewsCategoryEndpoint as endpoint } from "../apiEndpoints";
import { GetNewsCategoryProps } from "../getNewsCategoryTypes";

const getNewsCategoriesAPI = async ({ header }: GetNewsCategoryProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getNewsCategoriesAPI;
