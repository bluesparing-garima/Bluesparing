import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addBranchEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBranchProps } from "../getBranchTypes";

const addBranchAPI = async ({ header, branch }: AddEditBranchProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...branch,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addBranchAPI;
