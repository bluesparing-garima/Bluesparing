import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addRankEndpoint as endpoint } from "../apiEndPoints";
import { AddEditRankProps } from "../getRanksTypes";

const addRankAPI = async ({ header, rank }: AddEditRankProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...rank,
    })
  }
  return fetchInterceptor(url, options)
  
};

export default addRankAPI;
