import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBrokerEndpoint as endpoint } from "../apiEndPoints";
import { GetBrokerProps } from "../getBrokersTypes";

const getBrokersAPI = async ({ header }: GetBrokerProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBrokersAPI;
