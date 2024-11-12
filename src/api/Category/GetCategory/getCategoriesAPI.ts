import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCategoryEndpoint as endpoint } from "../apiEndpoints";
import { GetCategoryProps } from "../getCategoryTypes";

const getCategoriesAPI = async ({ header }: GetCategoryProps) => {
  
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getCategoriesAPI;
