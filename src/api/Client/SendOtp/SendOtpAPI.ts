import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { sendOtp as endpoint } from "../apiEndPoint";
import { header } from "../../../context/constant";

const SendOtpAPI = async (email:string) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
     email
    }),
  }

  return fetchInterceptor(url, options)

};

export default SendOtpAPI;