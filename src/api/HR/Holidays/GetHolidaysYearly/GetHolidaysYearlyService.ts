import { IGetHolidaysPayload } from "../../getHrTypes";
import GetHolidaysYearlyAPI from "./GetHolidaysYearlyAPI";

const GetHolidaysYearlyService = async ({ header }: IGetHolidaysPayload): Promise<any> => {
    try {
        const res = await GetHolidaysYearlyAPI({
            header,
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetHolidaysYearlyService;