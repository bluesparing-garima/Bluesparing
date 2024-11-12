import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountDetailsByPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountDetailsByPartnerProps } from "../getAccountTypes";

const GetAccountDetailsByPartnerAPI = async (
  props: GetAccountDetailsByPartnerProps
) => {
  const url = endpoint(props.startDate!, props.endDate!, props.partnerId!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }
  return fetchInterceptor(url, options)

};

export default GetAccountDetailsByPartnerAPI;
