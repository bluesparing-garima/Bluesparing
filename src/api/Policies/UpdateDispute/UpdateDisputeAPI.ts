import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { toggleDisputeEp as endpoint } from "../apiEndpoints";
import {   UpdateDisputeProps } from "../getPoliciesTypes";
import { header } from "../../../context/constant";
const UpdateDisputeAPI = async (payload: UpdateDisputeProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    headers:header,
    method: "PATCH",
    body: JSON.stringify({...payload}),
  }
  return fetchInterceptor(url, options)

};

export default UpdateDisputeAPI;