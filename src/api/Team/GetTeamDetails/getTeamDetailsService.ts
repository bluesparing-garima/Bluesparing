import getTeamDetailsAPI from "./getTeamDetailsAPI";
import { GetTeamDetailsProps } from "../getTeamsTypes";
import convertITeamToITeamVM from "../convertITeamToITeamVM";
import { ITeams, ITeamsVM } from "../../../components/Admin/Team/ITeam";
import { IResponse } from "../../IResponse";

const getTeamDetailsService = async ({
  header,
  teamId,
}: GetTeamDetailsProps):Promise<ITeamsVM> => {

  try {
    const resData = await  getTeamDetailsAPI({
      header: header,
      teamId: teamId,
    })as IResponse<ITeams>
 
    return convertITeamToITeamVM(resData.data);
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

export default getTeamDetailsService;
