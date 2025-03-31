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
    throw error;}

};

export default validatePolicyNumberService;
