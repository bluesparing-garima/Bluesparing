import getAllEmployeesAPI from "./getAllEmployeeAPI";
import { GetEmployeesProps } from "../getTeamsTypes";

const getAllEmployeeService = async ({ header }: GetEmployeesProps): Promise<any> => {
  try {
    const resData = await getAllEmployeesAPI({
      header: header,
    })
    return resData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default getAllEmployeeService;
