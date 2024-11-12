import { IGetAttendanceByEIdProps } from "../../getHrTypes";
import GetAttendanceByEmployeeIdAPI from "./GetAttendanceByEmployeeIdAPI";


const GetAttendanceByEmployeeService = async ({ header, employeeId }: IGetAttendanceByEIdProps): Promise<any> => {
    try {
        const res = await GetAttendanceByEmployeeIdAPI({
            header, employeeId
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetAttendanceByEmployeeService;