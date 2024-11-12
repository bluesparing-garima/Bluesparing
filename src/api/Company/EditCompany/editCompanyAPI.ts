import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editCompanyEndpoint as endpoint } from "../apiEndPoints";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const editCompanyAPI = async ({ header, company }: AddEditCompanyProps) => {
  const url = endpoint(company.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...company,
    }),
  }

  return fetchInterceptor(url, options)

};

export default editCompanyAPI;
