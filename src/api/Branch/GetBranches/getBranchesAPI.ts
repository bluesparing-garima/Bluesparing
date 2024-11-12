import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBranchEndpoint as endpoint } from "../apiEndPoints";
import { GetBranchProps } from "../getBranchTypes";

const getBranchesAPI = async ({ header }: GetBranchProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default getBranchesAPI;
