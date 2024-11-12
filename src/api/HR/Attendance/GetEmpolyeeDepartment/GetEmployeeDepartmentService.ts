
import { IGetRequestProps } from "../../getHrTypes";
import GetEmployeeDepartmentAPI from "./GetEmployeeDepartmentAPI";


const GetEmployeeDepartmentService = async ({ header }: IGetRequestProps): Promise<any> => {
    try {
        const res = await GetEmployeeDepartmentAPI({
            header
        });
        return res;
    } catch (error) {
        throw error
    }
};

export default GetEmployeeDepartmentService;