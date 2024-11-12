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

export default addTeamService;
