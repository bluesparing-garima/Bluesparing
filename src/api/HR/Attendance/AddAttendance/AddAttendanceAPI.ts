import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { attendancePostEndpoint as endpoint } from "../../ApiEndpoints";
import { IAddAttendancePayload } from "../../getHrTypes";

const AddAttendanceAPI = async ({ header, attendanceData,id }: IAddAttendancePayload) => {
    const url = endpoint(id)
    const options: FetchOptions = {
        method: id ? "PUT" : "POST",
        headers: header,
        body: JSON.stringify({
            ...attendanceData,
        }),
    }

    return fetchInterceptor(url, options)

};

export default AddAttendanceAPI;