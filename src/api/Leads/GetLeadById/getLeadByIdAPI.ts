import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getLeadByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByIdProps } from "../getLeadsTypes";

const getLeadByIdAPI = async ({ header, leadId }: GetLeadByIdProps) => {
  const url = endpoint(leadId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default getLeadByIdAPI;
