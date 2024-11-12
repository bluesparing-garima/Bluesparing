import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteRankEndpoint as endpoint } from "../apiEndPoints";
import { DeleteRankProps } from "../getRanksTypes";

const deleteRankAPI = async ({ header, rankId }: DeleteRankProps) => {
  const url = endpoint(rankId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
 
};

export default deleteRankAPI;
