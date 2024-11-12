import validateEmailAPI from "./validateEmailAPI";
import { ValidateEmailProps } from "../getTeamsTypes";

const validateEmailService = async ({ header, email }: ValidateEmailProps): Promise<any> => {
  try {
    const resData = await validateEmailAPI({
      header: header,
      email: email,
    })
    return resData;
  } catch (error) {
    throw error;
  }

};

export default validateEmailService;
