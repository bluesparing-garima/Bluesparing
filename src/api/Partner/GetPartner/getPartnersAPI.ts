import { getPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetPartnerProps } from "../getPartnersTypes";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
const getPartnersAPI = async ({ header, role }: GetPartnerProps) => {
  const url = endpoint(role!)
  const options:FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPartnersAPI;
