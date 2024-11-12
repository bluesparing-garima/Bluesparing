import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteTeamEndpoint as endpoint } from "../apiEndpoints";
import { DeleteTeamProps } from "../getTeamsTypes";

const deleteTeamAPI = async ({ header, teamId }: DeleteTeamProps) => {
  const url = endpoint(teamId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  };

  return fetchInterceptor(url, options)

};

export default deleteTeamAPI;
