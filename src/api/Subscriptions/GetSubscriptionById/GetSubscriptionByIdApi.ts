import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getSubscriptionByIdEndpoint as endpoint } from "../apiEndPoints";

const GetSubscriptionByIdApi = async ({ header,id }:{header:any,id:string} ) => {
  const url = endpoint(id)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default GetSubscriptionByIdApi;