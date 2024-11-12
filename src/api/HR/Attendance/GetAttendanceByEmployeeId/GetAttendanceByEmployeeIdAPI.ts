import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { attendanceGetByEmployeeIdEndpoint as endpoint } from "../../ApiEndpoints";
import { IGetAttendanceByEIdProps } from "../../getHrTypes";


const GetAttendanceByEmployeeIdAPI = async ({ header, employeeId }: IGetAttendanceByEIdProps) => {
    const url = endpoint(employeeId)
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)

};

export default GetAttendanceByEmployeeIdAPI;