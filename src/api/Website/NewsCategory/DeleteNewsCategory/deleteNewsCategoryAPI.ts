import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { deleteNewsCategoryEndpoint as endpoint } from "../apiEndpoints";
import { DeleteNewsCategoryProps } from "../getNewsCategoryTypes";

const deleteNewsCategoryAPI = async ({
  header,
  categoryId,
}: DeleteNewsCategoryProps) => {
  const url = endpoint(categoryId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteNewsCategoryAPI;
