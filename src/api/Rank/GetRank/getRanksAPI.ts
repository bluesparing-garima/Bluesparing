import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRankEndpoint as endpoint } from "../apiEndPoints";
import { GetRankProps } from "../getRanksTypes";

const getRanksAPI = async ({ header }: GetRankProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

 
};

export default getRanksAPI;
