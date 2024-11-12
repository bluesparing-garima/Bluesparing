import { IAddHolidayPayload } from "../../getHrTypes";
import AddHolidayAPI from "./AddHolidayAPI";

const AddHolidayService = async ({ header, holidayData }: IAddHolidayPayload): Promise<any> => {
    try {
        const res = await AddHolidayAPI({
            header,
            holidayData,
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default AddHolidayService;