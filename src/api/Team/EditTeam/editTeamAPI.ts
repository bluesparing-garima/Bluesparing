import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editTeamEndpoint as endpoint } from "../apiEndpoints";
import { AddEditTeamProps } from "../getTeamsTypes";

const editTeamAPI = async ({ header, team, teamId }: AddEditTeamProps) => {
  const url = endpoint(teamId!)
  const options: FetchOptions = {
    method: "PUT",
    body: team,
  };

  return fetchInterceptor(url, options)

};

export default editTeamAPI;
