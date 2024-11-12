import validatePolicyNumberAPI from "./validatePolicyNumberAPI";
import { ValidateBookingRequestProps } from "../getBookingRequestTypes";

const validatePolicyNumberService = async ({
  header,
  policyNumber,
}: ValidateBookingRequestProps): Promise<any>  => {
  try {
    const resData = await validatePolicyNumberAPI({
      header: header,
      policyNumber: policyNumber,
    })
    return resData
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

export default validatePolicyNumberService;
