import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRenewedPolicyEp as endpoint } from "../apiEndpoints";
import {  GetRenewedMotorPoliciesProps } from "../getPoliciesTypes";

const GetRenewedPolicyAPI = async ({
  header,
  startDate,
  endDate,partnerId
}: GetRenewedMotorPoliciesProps) => {
  const url = endpoint(startDate,endDate,partnerId)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
  
};

export default GetRenewedPolicyAPI;
