import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCompanytDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetCompanyDetailsProps } from "../getCompaniesTypes";

const getCompanyDetailsAPI = async ({ header, companyId }: GetCompanyDetailsProps) => {
  const url = endpoint(companyId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default getCompanyDetailsAPI;
