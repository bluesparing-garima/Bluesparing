import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCreditDebitsByPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetCreditDebitByPartnerProps } from "../getCreditDebitTypes";

const GetCreditDebitByPartnerAPI = async ({
  header,
  partnerId,
}: GetCreditDebitByPartnerProps) => {
  const url = endpoint(partnerId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetCreditDebitByPartnerAPI;
