import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getEmployeeEndpoint as endpoint } from "../apiEndpoints";
import { GetEmployeesProps } from "../getTeamsTypes";

const getAllEmployeesAPI = async ({ header }: GetEmployeesProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)


};

export default getAllEmployeesAPI;
