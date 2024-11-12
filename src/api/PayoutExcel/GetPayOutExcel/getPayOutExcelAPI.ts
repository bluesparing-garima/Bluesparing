import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPayOutExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetPayOutExcelProps } from "../getPayTypes";

const getPayOutExcelAPI = async ({ header }: GetPayOutExcelProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default getPayOutExcelAPI;
