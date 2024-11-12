import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCommissionDataEndpoint as endpoint } from "../apiEndPoints";
import { getCommissionProps } from "../getDashboardTypes";

const GetCommissionDataAPI = async ({
  header,filter
}: getCommissionProps) => {
  const url = endpoint(filter)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default GetCommissionDataAPI;
