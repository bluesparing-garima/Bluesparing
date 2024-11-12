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
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default validateEmailService;
