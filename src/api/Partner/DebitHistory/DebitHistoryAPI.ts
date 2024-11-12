import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { debitHistoryPartnerEndpoint as endpoint } from "../apiEndpoints";
import { DebitPartnerProps } from "../getPartnersTypes";

const DebitHistoryAPI = async ({
  header,
  startDate,
  endDate,
  partnerId,
}: DebitPartnerProps) => {
  const url = endpoint(startDate!, endDate!, partnerId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default DebitHistoryAPI;
