import addTeamAPI from "./addTeamAPI";
import { AddEditTeamProps } from "../getTeamsTypes";
import { SafeKaroUser } from "../../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addTeamService = async ({ header, team }: AddEditTeamProps): Promise<any> => {
  team.append("parentAdminId", UserData.parentAdminId);
  try {
    const resData = await addTeamAPI({
      header: header,
      team: team,
    })
    return resData;
  } catch (error) {

    throw error;
  }


};

export default addTeamService;
