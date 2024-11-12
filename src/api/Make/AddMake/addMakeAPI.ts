import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addMakeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditMakeProps } from "../getMakesTypes";

const addMakeAPI = async ({ header, make }: AddEditMakeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...make,
    }),
  }
  return fetchInterceptor(url, options)


};

export default addMakeAPI;
