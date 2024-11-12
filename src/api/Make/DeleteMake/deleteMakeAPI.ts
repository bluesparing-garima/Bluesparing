import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteMakeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteMakeProps } from "../getMakesTypes";

const deleteMakeAPI = async ({ header, makeId }: DeleteMakeProps) => {
  const url = endpoint(makeId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default deleteMakeAPI;
