import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTeamByRmEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamProps } from "../getTeamsTypes";

const GetRmTeamAPI = async ({ header, headRMId, signal }: GetTeamProps) => {
  const url = endpoint(headRMId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetRmTeamAPI;
