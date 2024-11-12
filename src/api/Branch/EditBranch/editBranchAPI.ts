import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editBranchEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBranchProps } from "../getBranchTypes";

const editBranchAPI = async ({ header, branch }: AddEditBranchProps) => {
  const url = endpoint(branch.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...branch,
    }),
  }

  return fetchInterceptor(url, options)

};

export default editBranchAPI;
