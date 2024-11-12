import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editRankEndpoint as endpoint } from "../apiEndPoints";
import { AddEditRankProps } from "../getRanksTypes";

const editRankAPI = async ({ header, rank }: AddEditRankProps) => {
  const url = endpoint(rank.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...rank,
    }),
  }
  return fetchInterceptor(url, options)

};

export default editRankAPI;
