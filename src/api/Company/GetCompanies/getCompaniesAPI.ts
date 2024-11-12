import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCompanyEndpoint as endpoint } from "../apiEndPoints";
import { GetCompanyProps } from "../getCompaniesTypes";

const getCompaniesAPI = async ({ header }: GetCompanyProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)


};

export default getCompaniesAPI;
