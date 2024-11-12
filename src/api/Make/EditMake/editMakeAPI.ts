import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editMakeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditMakeProps } from "../getMakesTypes";

const editMakeAPI = async ({ header, make }: AddEditMakeProps) => {
  const url = endpoint(make.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...make,
    }),
  }

  return fetchInterceptor(url, options)
  
};

export default editMakeAPI;
