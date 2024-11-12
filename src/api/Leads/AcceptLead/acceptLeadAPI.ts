import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { acceptLeadEndpoint as endpoint } from "../apiEndpoints";
import { AcceptLeadsProps } from "../getLeadsTypes";

const acceptLeadAPI = async ({ header, lead }: AcceptLeadsProps) => {
  const url = endpoint(lead.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ ...lead }),
  }

  return fetchInterceptor(url, options)
 
};

export default acceptLeadAPI;
