import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { verifyOtp as endpoint } from "../apiEndPoint";
import { header } from "../../../context/constant";

const VerifyOtpAPI = async (email: string, otp: string) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            email, otp
        }),
    }
    return fetchInterceptor(url, options)

};

export default VerifyOtpAPI;