import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteCaseTypeProps } from "../getCaseTypes";
const deleteCaseTypeAPI = async ({ header, caseTypeId }: DeleteCaseTypeProps) => {
  const url = endpoint(caseTypeId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default deleteCaseTypeAPI;
