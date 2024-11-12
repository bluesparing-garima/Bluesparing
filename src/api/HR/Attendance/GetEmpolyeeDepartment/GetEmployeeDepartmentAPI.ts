import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { attendanceGetDepartmentEndpoint as endpoint } from "../../ApiEndpoints";
import {  IGetRequestProps } from "../../getHrTypes";


const GetEmployeeDepartmentAPI = async ({ header }: IGetRequestProps) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)

};

export default GetEmployeeDepartmentAPI;