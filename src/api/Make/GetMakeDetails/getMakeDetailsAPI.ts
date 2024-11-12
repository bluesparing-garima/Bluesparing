import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMakeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetMakeDetailsProps } from "../getMakesTypes";

const getMakeDetailsAPI = async ({ header, makeId }: GetMakeDetailsProps) => {
  const url = endpoint(makeId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getMakeDetailsAPI;
