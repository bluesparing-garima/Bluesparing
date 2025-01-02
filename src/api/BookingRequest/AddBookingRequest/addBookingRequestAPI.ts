import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBookingRequestProps } from "../getBookingRequestTypes";

let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addBookingRequestAPI = async ({
  bookingRequest,
}: AddEditBookingRequestProps) => {
  bookingRequest.append("partnerAdminId",UserData.parentAdminId);
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: bookingRequest,
  }

  return fetchInterceptor(url, options)

};

export default addBookingRequestAPI;
