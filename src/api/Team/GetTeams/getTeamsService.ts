import getTeamsAPI from "./getTeamsAPI";
import { GetTeamProps } from "../getTeamsTypes";

const getTeamService = async ({ header }: GetTeamProps):Promise<any> => {
  try {
    const resData = await   getTeamsAPI({
      header: header,
    })
    return resData;
  } catch (error) {
    throw error;
  }
 
};

export default getTeamService;
