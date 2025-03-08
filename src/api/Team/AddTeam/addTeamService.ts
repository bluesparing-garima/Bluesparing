import addTeamAPI from "./addTeamAPI";
import { AddTeamProps } from "../getTeamsTypes";

const addTeamService = async ({ header, team ,onProgress}: AddTeamProps): Promise<any> => {
  try {
    const resData = await addTeamAPI({
      header: header,
      team: team,
      onProgress
    })
    return resData;
  } catch (error) {

    throw error;
  }


};

export default addTeamService;
