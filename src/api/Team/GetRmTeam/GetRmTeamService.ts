import { GetTeamProps } from "../getTeamsTypes";
import GetRmTeamAPI from "./GetRmTeamAPI";

const GetRmTeamService = async ({ header, headRMId }: GetTeamProps): Promise<any> => {
  try {
    const res = await GetRmTeamAPI({
      header: header, headRMId
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetRmTeamService;
