import { header } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { GHealthEp as endpoint, FilterTypes } from "../Endpoints";
const GetHealthPolicyAPI = async (   limit?: number,page?: number,
  sortedBy?: string,
  q?: FilterTypes,
  order?:string) => {
  const url = endpoint(limit,page,sortedBy,q,order)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default GetHealthPolicyAPI;
