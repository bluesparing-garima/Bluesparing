import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { payInExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetExcelProps } from "../getUploadTypes";

const PayInExcelAPI = async ({ header, excel }: GetExcelProps) => {

  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel,
  }

  return fetchInterceptor(url, options)
 
};

export default PayInExcelAPI;
