import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { attendanceGetDashboardEndpoint as endpoint } from "../../ApiEndpoints";
import {  IGetRequestProps } from "../../getHrTypes";
const GetAttendanceDashboardAPI = async ({ header }: IGetRequestProps) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)

};

export default GetAttendanceDashboardAPI;