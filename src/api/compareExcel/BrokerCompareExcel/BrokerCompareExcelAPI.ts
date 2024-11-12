import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { brokerCompareExcelEndpoint as endpoint } from "../apiEndPoints";
import { GetBrokerExcelProps } from "../getCompareTypes";

const PayInExcelAPI = async ({
  header,
  excel
}: GetBrokerExcelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel,
  }

  return fetchInterceptor(url, options)

};

export default PayInExcelAPI;
