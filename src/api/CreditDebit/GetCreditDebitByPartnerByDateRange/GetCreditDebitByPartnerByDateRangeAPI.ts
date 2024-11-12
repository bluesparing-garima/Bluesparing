import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCreditDebitsByPartnerDateRangeEndpoint as endpoint } from "../apiEndpoints";
import { GetCreditDebitByPartnerDateRangeProps } from "../getCreditDebitTypes";

const GetCreditDebitByPartnerByDateRangeAPI = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: GetCreditDebitByPartnerDateRangeProps) => {
  const url = endpoint(partnerId, startDate, endDate)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetCreditDebitByPartnerByDateRangeAPI;
