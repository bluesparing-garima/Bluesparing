
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRankDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetRankDetailsProps } from "../getRanksTypes";

const getRankDetailsAPI = async ({ header, rankId }: GetRankDetailsProps) => {
  const url = endpoint(rankId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getRankDetailsAPI;
