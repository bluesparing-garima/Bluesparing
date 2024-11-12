import getRMListAPI from "./getRMListAPI";
import { GetRMListProps } from "../getTeamsTypes";

const getRMListService = async ({ header, role }: GetRMListProps):Promise<any> => {
  try {
    const resData = await  getRMListAPI({
      header: header,
      role: role,
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

export default getRMListService;
