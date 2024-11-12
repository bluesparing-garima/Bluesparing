import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { partnerCompareExcelEndpoint as endpoint } from "../apiEndPoints";
import { GetPartnerExcelProps } from "../getCompareTypes";

const PartnerCompareExcelAPI = async ({
  header,
  excel
}: GetPartnerExcelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: excel,
  }

  return fetchInterceptor(url, options)

};

export default PartnerCompareExcelAPI;
