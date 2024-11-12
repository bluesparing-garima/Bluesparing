import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { excelPayOutEndpoint as endpoint } from "../apiEndpoints";
import { GetExcelProps } from "../getUploadTypes";

const PayInExcelAPI = async ({  excel }: GetExcelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel,
  }

  return fetchInterceptor(url, options)

};

export default PayInExcelAPI;