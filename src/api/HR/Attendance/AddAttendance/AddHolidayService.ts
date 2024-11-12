import { IAddAttendancePayload } from "../../getHrTypes";
import AddAttendanceAPI from "./AddAttendanceAPI";


const AddAttendanceService = async ({ header, attendanceData, id }: IAddAttendancePayload): Promise<any> => {
    try {
        const res = await AddAttendanceAPI({
            header,
            attendanceData, id
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default AddAttendanceService;