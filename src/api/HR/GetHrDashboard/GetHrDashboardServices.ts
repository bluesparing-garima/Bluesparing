import { IGetHrDashboard } from "../getHrTypes";
import GetHrDashboardAPI from "./GetHrDashboardAPI";

const GetHrDashboardServices = async ({ header, startDate, endDate, hrId }: IGetHrDashboard): Promise<any> => {
    try {
        const res = await GetHrDashboardAPI({
            header, startDate, endDate, hrId
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetHrDashboardServices;