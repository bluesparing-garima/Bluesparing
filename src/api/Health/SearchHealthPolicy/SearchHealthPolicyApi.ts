import { header } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { searchHealthEp as endpoint } from "../Endpoints";
const SearchHealthPolicyApi = async (  q:string) => {
  const url = endpoint(q)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default SearchHealthPolicyApi;