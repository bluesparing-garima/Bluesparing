import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import {getOccupancyEp as endpoint } from "../apiEndPoints"
import { header } from "../../../context/constant";
const GetOccupancyApi = async () => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetOccupancyApi;
