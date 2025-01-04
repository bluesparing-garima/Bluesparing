
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addLeadEndpoint as endpoint } from "../apiEndpoints";
import { AddEditLeadsProps } from "../getLeadsTypes";

const addLeadsAPI = async ({ lead }: AddEditLeadsProps) => {

  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: lead,
  }

  return fetchInterceptor(url, options)

};

export default addLeadsAPI;
