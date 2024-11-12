import { IAddHolidayPayload } from "../../getHrTypes";
import EditholidayAPI from "./EditholidayAPI";


const EditHolidayService = async ({ header, holidayData,id }: IAddHolidayPayload): Promise<any> => {
    try {
        const res = await EditholidayAPI({
            header,
            holidayData,id
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default EditHolidayService;