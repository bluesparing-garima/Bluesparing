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
    throw error;
  }

};

export default deleteTeamService;
