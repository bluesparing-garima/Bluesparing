import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { validateEmailEndpoint as endpoint } from "../apiEndpoints";
import { ValidateEmailProps } from "../getTeamsTypes";

const validateEmailAPI = async ({ header, email }: ValidateEmailProps) => {
  const url =endpoint(email!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  };

  return fetchInterceptor(url, options)

};

export default validateEmailAPI;
