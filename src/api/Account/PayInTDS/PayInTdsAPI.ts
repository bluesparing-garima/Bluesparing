import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getTdsPayinEp as endpoint } from "../apiEndpoints";
import { GetAccountDetailsByBrokerProps } from "../getAccountTypes";

const PayInTdsAPI = async (
  props: GetAccountDetailsByBrokerProps
) => {
  const url = endpoint(props.startDate!, props.endDate!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }
  return fetchInterceptor(url, options)

};

export default PayInTdsAPI;