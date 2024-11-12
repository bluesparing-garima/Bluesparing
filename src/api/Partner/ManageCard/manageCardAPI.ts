import { historyPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetPartnerCardDetailsProps } from "../getPartnersTypes";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
const manageCardAPI = async ({
  header,
  partnerId,
}: GetPartnerCardDetailsProps) => {
  const url = endpoint(partnerId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)


};

export default manageCardAPI;
