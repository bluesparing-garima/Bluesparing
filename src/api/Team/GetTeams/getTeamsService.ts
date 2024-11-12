import getTeamsAPI from "./getTeamsAPI";
import { GetTeamProps } from "../getTeamsTypes";

const getTeamService = async ({ header }: GetTeamProps):Promise<any> => {
  try {
    const resData = await   getTeamsAPI({
      header: header,
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

export default getTeamService;
