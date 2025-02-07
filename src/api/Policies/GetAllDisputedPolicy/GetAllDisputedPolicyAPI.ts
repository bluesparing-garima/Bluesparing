import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAllDisputedEp as endpoint } from "../apiEndpoints";
import { header } from "../../../context/constant";
const GetAllDisputedPolicyAPI = async () => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default GetAllDisputedPolicyAPI;
