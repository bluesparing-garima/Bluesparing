import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const editCaseTypeAPI = async ({ header, caseType }: AddEditCaseTypeProps) => {
  const url = endpoint(caseType.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...caseType,
    }),
  }

  return fetchInterceptor(url, options)

};

export default editCaseTypeAPI;
