import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getDisputeMsgEp as endpoint } from "../apiEndpoints";
import { header } from "../../../context/constant";
const GetDisputeDataAPI = async (policyId:string) => {
  const url = endpoint(policyId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default GetDisputeDataAPI;