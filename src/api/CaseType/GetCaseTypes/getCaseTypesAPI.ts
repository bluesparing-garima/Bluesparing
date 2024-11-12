import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetCaseTypeProps } from "../getCaseTypes";
const getCaseTypesAPI = async ({ header }: GetCaseTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default getCaseTypesAPI;
