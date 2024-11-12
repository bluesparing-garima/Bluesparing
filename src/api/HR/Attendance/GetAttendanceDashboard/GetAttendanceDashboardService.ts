
import { IGetRequestProps } from "../../getHrTypes";
import GetAttendanceDashboardAPI from "./GetAttendanceDashboardAPI";

const GetAttendanceDashboardService = async ({ header }: IGetRequestProps): Promise<any> => {
    try {
        const res = await GetAttendanceDashboardAPI({
            header
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetAttendanceDashboardService;