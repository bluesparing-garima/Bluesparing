import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTeamDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamDetailsProps } from "../getTeamsTypes";

const getTeamDetailsAPI = async ({ header, teamId }: GetTeamDetailsProps) => {
  const url = endpoint(teamId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)

};

export default getTeamDetailsAPI;
