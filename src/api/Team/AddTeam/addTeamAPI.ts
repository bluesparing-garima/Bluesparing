import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addTeamEndpoint as endpoint } from "../apiEndpoints";
import { AddEditTeamProps } from "../getTeamsTypes";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addTeamAPI = async ({  team }: AddEditTeamProps) => {
  team.append("parentAdminId",UserData.parentAdminId)
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: team
  };

  return fetchInterceptor(url, options)

};

export default addTeamAPI;
