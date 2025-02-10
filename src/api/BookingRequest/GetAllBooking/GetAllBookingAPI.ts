import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getAllBookingEndpoint as endpoint } from "../apiEndPoints";
import { header } from "../../../context/constant";
const GetAllBookingAPI = async () => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetAllBookingAPI;