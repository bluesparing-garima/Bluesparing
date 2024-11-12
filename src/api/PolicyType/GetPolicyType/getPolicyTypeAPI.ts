import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyTypeProps } from "../getPolicyTypes";

const getPolicyTypeAPI = async ({ header }: GetPolicyTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getPolicyTypeAPI;
