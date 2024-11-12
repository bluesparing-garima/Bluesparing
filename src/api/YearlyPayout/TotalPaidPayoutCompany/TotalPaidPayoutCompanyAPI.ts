import fetchInterceptor, { FetchOptions } from '../../../utils/fetchInterceptor ';
import { TotalPaidPayoutCompanyEndpoint as endpoint } from '../apiEndpoints'
import { getTotalCompanyProps } from "../getYearlyPayoutType";


const TotalPaidPayoutCompanyAPI = async ({ header, partnerId,category }: getTotalCompanyProps) => {
  const url = endpoint(partnerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default TotalPaidPayoutCompanyAPI;