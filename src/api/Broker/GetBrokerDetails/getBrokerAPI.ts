import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBrokerDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetBrokerDetailsProps } from "../getBrokersTypes";

const getBrokerDetailsAPI = async ({ header, brokerId }: GetBrokerDetailsProps) => {
  const url = endpoint(brokerId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBrokerDetailsAPI;
