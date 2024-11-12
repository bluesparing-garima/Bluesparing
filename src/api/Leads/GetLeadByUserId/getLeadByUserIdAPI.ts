import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getLeadByUserIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByUserIdProps } from "../getLeadsTypes";

const getLeadByUserIdAPI = async ({ header, userId }: GetLeadByUserIdProps) => {
  const url = endpoint(userId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getLeadByUserIdAPI;
