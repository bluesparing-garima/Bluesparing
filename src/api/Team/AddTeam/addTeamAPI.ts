import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addTeamEndpoint as endpoint } from "../apiEndpoints";
import { AddEditTeamProps } from "../getTeamsTypes";

const addTeamAPI = async ({ header, team }: AddEditTeamProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: team
  };

  return fetchInterceptor(url, options)

};

export default addTeamAPI;
