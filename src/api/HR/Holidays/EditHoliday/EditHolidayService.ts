import { IAddHolidayPayload } from "../../getHrTypes";
import EditHolidayAPI from "./EditholidayAPI";


const EditHolidayService = async ({ header, holidayData,id }: IAddHolidayPayload): Promise<any> => {
    try {
        const res = await EditHolidayAPI({
            header,
            holidayData,id
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default EditHolidayService;