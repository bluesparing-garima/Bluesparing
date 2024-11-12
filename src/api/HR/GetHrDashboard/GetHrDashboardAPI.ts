
import fetchInterceptor, { FetchOptions } from '../../../utils/fetchInterceptor ';
import {  HrDashBoardEndpoint as endpoint } from '../ApiEndpoints'
import { IGetHrDashboard } from "../getHrTypes";

const GetHrDashboardAPI = async ({ header ,startDate,endDate,hrId}: IGetHrDashboard) => {
    const url = endpoint(startDate,endDate,hrId)
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)

};

export default GetHrDashboardAPI;