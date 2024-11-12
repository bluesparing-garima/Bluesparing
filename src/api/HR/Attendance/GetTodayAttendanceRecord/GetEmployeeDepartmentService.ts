import { IGetToadyAttendanceProps } from "../../getHrTypes";
import GetTodayAttendanceRecordAPI from "./GetEmployeeDepartmentAPI";

const GetTodayAttendanceRecordService = async ({
  header,
  d,
  eId,
}: IGetToadyAttendanceProps): Promise<any> => {
  try {
    const res = await GetTodayAttendanceRecordAPI({
      header,
      d,
      eId,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default GetTodayAttendanceRecordService;
