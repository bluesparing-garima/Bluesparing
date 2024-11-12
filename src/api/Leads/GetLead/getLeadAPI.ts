import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getLeadEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadsProps } from "../getLeadsTypes";

const getLeadAPI = async ({ header }: GetLeadsProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getLeadAPI;
