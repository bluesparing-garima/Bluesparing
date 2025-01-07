import getTeamDetailsAPI from "./getTeamDetailsAPI";
import { GetTeamDetailsProps } from "../getTeamsTypes";

import { ITeams } from "../../../components/Admin/Team/ITeam";
import { IResponse } from "../../IResponse";

const getTeamDetailsService = async ({
  header,
  teamId,
}: GetTeamDetailsProps):Promise<any> => {

  try {
    const resData = await  getTeamDetailsAPI({
      header: header,
      teamId: teamId,
    })as IResponse<ITeams>
 
    return resData.data;
  } catch (error) {
    throw error;
  }

  
};

export default getTeamDetailsService;
