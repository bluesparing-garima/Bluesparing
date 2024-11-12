import { IGetAttendanceByDate } from "../../getHrTypes";
import AttendanceByDateFilterAPI from "./AttendanceByDateFilterAPI";


const AttendanceByDateFilterService = async ({ header, startDate, endDate, emId }: IGetAttendanceByDate): Promise<any> => {
    try {
        const res = await AttendanceByDateFilterAPI({
            header, startDate, endDate, emId
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default AttendanceByDateFilterService;