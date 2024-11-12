import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { validateBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { ValidateBookingRequestProps } from "../getBookingRequestTypes";

const validatePolicyNumberAPI = async ({
  header,
  policyNumber,
}: ValidateBookingRequestProps) => {
  const url = endpoint(policyNumber)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default validatePolicyNumberAPI;
