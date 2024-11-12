import { getAttendanceProps } from "../getRolesTypes";
import GetAttendanceCountAPI from "./GetAttendanceCountAPI";

const GetAttendanceCountService = async ({
  header,
  eId,
}: getAttendanceProps): Promise<any> => {
  try {
    const res = await GetAttendanceCountAPI({
      header,
      eId,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default GetAttendanceCountService;
