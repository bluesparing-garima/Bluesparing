import fetchInterceptor, {
  FetchOptions,
} from "../../../utils/fetchInterceptor ";
import { employeeAttendanceEnpoint as endpoint } from "../apiEndpoints";
import { getAttendanceProps } from "../getRolesTypes";

const GetAttendanceCountAPI = async ({ header, eId }: getAttendanceProps) => {
  const url = endpoint(eId);
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options);
};

export default GetAttendanceCountAPI;
