import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyDataEndpoint as endpoint } from "../apiEndPoints";
import { getPolicyProps } from "../getDashbaordTypes";

const GetPolicyDataAPI = async ({ header, filter }: getPolicyProps) => {
  const url = endpoint(filter)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default GetPolicyDataAPI;
