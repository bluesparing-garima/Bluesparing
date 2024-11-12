import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { editNewsEndpoint as endpoint } from "../apiEndpoints";
import { AddEditNewsProps } from "../getNewsTypes";

const editNewsAPI = async ({ news, newsId }: AddEditNewsProps) => {
  const url = endpoint(newsId!)
  const options: FetchOptions = {
    method: "PUT",
    body: news,
  }

  return fetchInterceptor(url, options)

};

export default editNewsAPI;
