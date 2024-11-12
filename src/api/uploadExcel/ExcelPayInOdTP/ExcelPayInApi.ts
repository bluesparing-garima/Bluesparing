import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { excelPayInEndpoint as endpoint } from "../apiEndpoints";
import { GetExcelProps } from "../getUploadTypes";

const ExcelPayInApi = async ({ excel }: GetExcelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel,
  }

  return fetchInterceptor(url, options)

};

export default ExcelPayInApi;