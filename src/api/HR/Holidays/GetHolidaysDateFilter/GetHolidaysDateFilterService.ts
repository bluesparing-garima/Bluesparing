import { IGetHolidaysPayload } from "../../getHrTypes";
import GetHolidaysDateFilterAPI from "./GetHolidaysDateFilterAPI";


const GetHolidaysDateFilterService = async ({ header, startDate, endDate }: IGetHolidaysPayload): Promise<any> => {
    try {
        const res = await GetHolidaysDateFilterAPI({
            header, startDate, endDate
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetHolidaysDateFilterService;