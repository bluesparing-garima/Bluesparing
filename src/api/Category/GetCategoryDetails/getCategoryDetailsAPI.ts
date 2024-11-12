import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCategorytDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetCategoryDetailsProps } from "../getCategoryTypes";

const getCategoryDetailsAPI = async ({ header, categoryId }: GetCategoryDetailsProps) => {
  const url = endpoint(categoryId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getCategoryDetailsAPI;
