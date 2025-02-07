import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTdsPayoutEp as endpoint } from "../apiEndpoints";
import { GetAccountDetailsByPartnerProps } from "../getAccountTypes";

const PayOutTdsAPI = async (
  props: GetAccountDetailsByPartnerProps
) => {
  const url = endpoint(props.startDate!, props.endDate!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }
  return fetchInterceptor(url, options)

};

export default PayOutTdsAPI;