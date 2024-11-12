import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { addNewsEndpoint as endpoint } from "../apiEndpoints";
import { AddEditNewsProps } from "../getNewsTypes";

const addNewsAPI = async ({ header, news }: AddEditNewsProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: news,
  }

  return fetchInterceptor(url, options)

};

export default addNewsAPI;
