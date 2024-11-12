import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editLeadEndpoint as endpoint } from "../apiEndpoints";
import { AddEditLeadsProps } from "../getLeadsTypes";

const editLeadAPI = async ({ header, lead, leadId }: AddEditLeadsProps) => {
  const url = endpoint(leadId!)
  const options: FetchOptions= {
    method: "PUT",
    body: lead,
  }

  return fetchInterceptor(url, options)
  
};

export default editLeadAPI;
