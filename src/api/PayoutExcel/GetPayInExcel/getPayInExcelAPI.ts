import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPayInExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetPayInExcelProps } from "../getPayTypes";

const getPayInExcelAPI = async ({ header }: GetPayInExcelProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPayInExcelAPI;
