import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getNewsEndpoint as endpoint } from "../apiEndpoints";
import { GetNewsProps } from "../getNewsTypes";

const getNewsAPI = async ({ header }: GetNewsProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getNewsAPI;
