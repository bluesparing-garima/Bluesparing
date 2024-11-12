import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteCompanyEndpoint as endpoint } from "../apiEndPoints";
import { DeleteCompanyProps } from "../getCompaniesTypes";

const deleteCompanyAPI = async ({ header, companyId }: DeleteCompanyProps) => {
  const url = endpoint(companyId!)
  const options: FetchOptions= {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default deleteCompanyAPI;
