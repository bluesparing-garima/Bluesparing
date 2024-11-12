import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addCompanyEndpoint as endpoint } from "../apiEndPoints";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const addCompanyAPI = async ({ header, company }: AddEditCompanyProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...company,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addCompanyAPI;
