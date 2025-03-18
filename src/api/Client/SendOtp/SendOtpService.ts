import SendOtpAPI from "./SendOtpAPI";

const SendOtpService = async (email:string): Promise<any> => {

  try {
    const res = await SendOtpAPI(email)
    return res
  } catch (error) {
    throw error
  }


};

export default SendOtpService;
