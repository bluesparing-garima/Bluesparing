import deleteTeamAPI from "./deleteTeamAPI";
import { DeleteTeamProps } from "../getTeamsTypes";

const deleteTeamService = async ({
  header,
  teamId,
  teams,
}: DeleteTeamProps): Promise<any> => {
  try {
    const resData = await deleteTeamAPI({
      header,
      teamId,
      teams,
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

export default deleteTeamService;
