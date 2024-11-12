import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { deleteNewsEndpoint as endpoint } from "../apiEndpoints";
import { DeleteNewsProps } from "../getNewsTypes";

const deleteNewsAPI = async ({ header, newsId }: DeleteNewsProps) => {
  const url = endpoint(newsId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteNewsAPI;
