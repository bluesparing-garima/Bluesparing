import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTeamDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamDetailsProps } from "../getTeamsTypes";

const getTeamDetailsAPI = async ({ header, teamId,parentAdminId }: GetTeamDetailsProps) => {
  const url = endpoint(teamId!,parentAdminId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)

};

export default getTeamDetailsAPI;
