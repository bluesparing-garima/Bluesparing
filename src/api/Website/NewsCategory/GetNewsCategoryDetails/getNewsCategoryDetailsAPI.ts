import { INewsCategories } from "../../../../components/Website/NewsCategory/INewsCategory";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getNewsCategoryDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetNewsCategoryDetailsProps } from "../getNewsCategoryTypes";

const getNewsCategoryDetailsAPI = async ({ header, categoryId }: GetNewsCategoryDetailsProps) => {
  const url = endpoint(categoryId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor<INewsCategories>(url, options)
  
};

export default getNewsCategoryDetailsAPI;
