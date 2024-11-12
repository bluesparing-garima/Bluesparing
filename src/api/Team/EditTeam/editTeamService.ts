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
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default editTeamService;
