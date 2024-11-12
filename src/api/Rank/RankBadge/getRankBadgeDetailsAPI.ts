import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRankBadgeDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetRankBadgeDetailsProps } from "../getRanksTypes";

const getRankBadgeDetailsAPI = async ({
  header,
  partnerId,
}: GetRankBadgeDetailsProps) => {
  const url = endpoint(partnerId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getRankBadgeDetailsAPI;
