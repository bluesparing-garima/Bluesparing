import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addPercentageEndpoint as endpoint } from "../apiEndpoint";
import { AddEditPercentageProps } from "../getPercentageTypes";

const addPercenatgeAPI = async ({ header, policy }: AddEditPercentageProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...policy,
    }),
  }
  return fetchInterceptor(url, options)
 
};

export default addPercenatgeAPI;
