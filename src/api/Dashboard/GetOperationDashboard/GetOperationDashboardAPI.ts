import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getOperationDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getOperationDashboardProps } from "../getDashboardTypes";

const getOperationDashboardAPI = async ({
  header,
  operationUserId,
}: getOperationDashboardProps) => {
  const url = endpoint(operationUserId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default getOperationDashboardAPI;
