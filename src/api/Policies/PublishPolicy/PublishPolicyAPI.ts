import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { publishPolicyEp as endpoint } from "../apiEndpoints";
import {  EditPublishPartnerProps } from "../getPoliciesTypes";
import { header } from "../../../context/constant";
const PublishPolicyAPI = async (payload: EditPublishPartnerProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    headers:header,
    method: "PATCH",
    body: JSON.stringify({...payload}),
  }
  return fetchInterceptor(url, options)

};

export default PublishPolicyAPI;