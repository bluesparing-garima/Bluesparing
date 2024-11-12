import fetchInterceptor, {
  FetchOptions,
} from "../../../../utils/fetchInterceptor ";
import { attendanceTodayByEid as endpoint } from "../../ApiEndpoints";
import { IGetToadyAttendanceProps } from "../../getHrTypes";

const GetTodayAttendanceRecordAPI = async ({
  header,
  d,
  eId,
}: IGetToadyAttendanceProps) => {
  const url = endpoint(d, eId);
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options);
};

export default GetTodayAttendanceRecordAPI;
