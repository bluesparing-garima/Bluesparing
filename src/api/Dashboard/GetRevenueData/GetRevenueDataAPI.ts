import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyRevenueEndpoint as endpoint } from "../apiEndPoints";
import { getPolicyProps } from "../getDashboardTypes";

const GetRevenueDataAPI = async ({ header, filter }: getPolicyProps) => {
    const url = endpoint(filter)
    const options: FetchOptions = {
        method: "GET",
        headers: header,
    }

    return fetchInterceptor(url, options)
};

export default GetRevenueDataAPI;
