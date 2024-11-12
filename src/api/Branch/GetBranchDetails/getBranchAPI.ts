import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBranchDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetBranchDetailsProps } from "../getBranchTypes";

const getBranchDetailsAPI = async ({ header, branchId }: GetBranchDetailsProps) => {
  const url = endpoint(branchId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getBranchDetailsAPI;
