import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMakeEndpoint as endpoint } from "../apiEndpoints";
import { GetMakeProps } from "../getMakesTypes";

const getMakesAPI = async ({ header }: GetMakeProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default getMakesAPI;
