import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBookedEndpoint as endpoint } from "../apiEndPoints";
import { header } from "../../../context/constant";
const GetAllBookedBookingAPI = async () => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetAllBookedBookingAPI;