import { IDeleteHolidaysPayload } from "../../getHrTypes";
import DeleteHolidayAPI from "./DeleteHolidayAPI";
const DeleteHolidayService = async ({ header, id }: IDeleteHolidaysPayload): Promise<any> => {
    try {
        const res = await DeleteHolidayAPI({
            header,
            id
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default DeleteHolidayService;