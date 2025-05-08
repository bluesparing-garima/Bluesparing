import { header } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { filteredEp as endpoint } from "../Endpoints";
const GetAllFilteredPolicyAPI = async ( startDate:string,endDate:string  ) => {
  const url = endpoint(startDate,endDate)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
  
};

export default GetAllFilteredPolicyAPI;
