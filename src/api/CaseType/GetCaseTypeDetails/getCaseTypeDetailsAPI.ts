import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCaseTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetCaseTypeDetailsProps } from "../getCaseTypes";

const getCaseTypeDetailsAPI = async ({ header, caseTypeId }: GetCaseTypeDetailsProps) => {
  const url = endpoint(caseTypeId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default getCaseTypeDetailsAPI;
