import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { dateFilerAttendanceEndPoint as endpoint } from "../../ApiEndpoints";
import { IGetAttendanceByDate } from "../../getHrTypes";
const AttendanceByDateFilterAPI = async ({ header, startDate, endDate, emId }: IGetAttendanceByDate) => {
    const url = endpoint(startDate, endDate, emId);
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)

};

export default AttendanceByDateFilterAPI;