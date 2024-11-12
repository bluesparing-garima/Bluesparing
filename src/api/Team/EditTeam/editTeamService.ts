import editTeamAPI from "./editTeamAPI";
import { AddEditTeamProps } from "../getTeamsTypes";

const editTeamService = async ({ team, teamId }: AddEditTeamProps): Promise<any> => {
  try {
    const resData = await editTeamAPI({
      team,
      teamId,
    })
    return resData;
  } catch (error) {
    throw error;
  }

};

export default editTeamService;
