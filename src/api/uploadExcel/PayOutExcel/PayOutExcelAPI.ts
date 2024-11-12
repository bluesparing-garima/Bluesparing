import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { payOutExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetExcelProps } from "../getUploadTypes";

const PayOutExcelAPI = async ({ header, excel }: GetExcelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel
  }

  return fetchInterceptor(url, options)

};

export default PayOutExcelAPI;
