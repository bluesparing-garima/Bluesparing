import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getRMListEndpoint as endpoint } from "../apiEndpoints";
import { GetRMListProps } from "../getTeamsTypes";

const getRMListAPI = async ({ header,role }: GetRMListProps) => {
  const url =endpoint(role)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)


};

export default getRMListAPI;
