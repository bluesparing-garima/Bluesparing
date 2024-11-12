import { INews } from "../../../../components/Website/News/News/INews";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { getNewstDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetNewsDetailsProps } from "../getNewsTypes";

const getNewsDetailsAPI = async ({ header, newsId }: GetNewsDetailsProps) => {
  const url = endpoint(newsId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor<INews>(url, options)

};

export default getNewsDetailsAPI;
