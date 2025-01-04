import addTeamAPI from "./addTeamAPI";
import { AddEditTeamProps } from "../getTeamsTypes";

const addTeamService = async ({ header, team }: AddEditTeamProps): Promise<any> => {
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
