import getAllEmployeesAPI from "./getAllEmployeeAPI";
import { GetEmployeesProps } from "../getTeamsTypes";

const getAllEmployeeService = async ({ header }: GetEmployeesProps): Promise<any> => {
  try {
    const resData = await getAllEmployeesAPI({
      header: header,
    })
    return resData;
  } catch (error) {
    throw error;
  }

};

export default getAllEmployeeService;
