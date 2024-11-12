import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTeamEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamProps } from "../getTeamsTypes";

const getTeamsAPI = async ({ header }: GetTeamProps) => {
  const url =endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)
  
};

export default getTeamsAPI;
