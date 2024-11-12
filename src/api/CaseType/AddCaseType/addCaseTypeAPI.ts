import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const addCaseTypeAPI = async ({ header, caseType }: AddEditCaseTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
      headers: header,
      body: JSON.stringify({
        ...caseType,
      }),
  }

  return fetchInterceptor(url, options)
 
};

export default addCaseTypeAPI;

