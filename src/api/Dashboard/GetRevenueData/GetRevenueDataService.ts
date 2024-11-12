import { getPolicyProps } from "../getDashboardTypes";
import GetRevenueDataAPI from "./GetRevenueDataAPI";

const GetRevenueDataService = async ({ header, filter }: getPolicyProps): Promise<any> => {
    try {
        const res = await GetRevenueDataAPI({
            header: header,
            filter: filter,
        })
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetRevenueDataService;