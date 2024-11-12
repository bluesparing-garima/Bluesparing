import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { validateMakeEndpoint as endpoint } from "../apiEndpoints";
import { ValidateMakeDetailsProps } from "../getMakesTypes";

const validateMakeAPI = async ({
  header,
  makeName,
}: ValidateMakeDetailsProps) => {
  const url = endpoint(makeName!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,

  }

  return fetchInterceptor(url, options)


};

export default validateMakeAPI;
