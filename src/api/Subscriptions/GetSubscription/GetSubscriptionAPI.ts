import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getSubscriptionEndpoint as endpoint } from "../apiEndPoints";

const GetSubscriptionAPI = async ({ header }:{header:any}) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default GetSubscriptionAPI;