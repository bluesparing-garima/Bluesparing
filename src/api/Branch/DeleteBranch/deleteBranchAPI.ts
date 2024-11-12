import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteBranchEndpoint as endpoint } from "../apiEndPoints";
import { DeleteBranchProps } from "../getBranchTypes";

const deleteBranchAPI = async ({ header, branchId }: DeleteBranchProps) => {
  const url = endpoint(branchId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteBranchAPI;
