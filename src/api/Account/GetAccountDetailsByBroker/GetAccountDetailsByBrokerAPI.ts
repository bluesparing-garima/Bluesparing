import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAccountDetailsByBrokerEndpoint as endpoint } from "../apiEndpoints";
import { GetAccountDetailsByBrokerProps } from "../getAccountTypes";

const GetAccountDetailsByBrokerAPI = async (
  props: GetAccountDetailsByBrokerProps
) => {

  const url = endpoint(props.startDate!, props.endDate!, props.brokerName!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }
  return fetchInterceptor(url, options)


};

export default GetAccountDetailsByBrokerAPI;
