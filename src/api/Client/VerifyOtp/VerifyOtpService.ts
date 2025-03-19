import VerifyOtpAPI from "./VerifyOtpAPI";

const VerifyOtpService = async (email:string,otp:string): Promise<any> => {
  try {
    const res = await VerifyOtpAPI(email,otp)
    return res
  } catch (error) {
    throw error
  }
};

export default VerifyOtpService;
