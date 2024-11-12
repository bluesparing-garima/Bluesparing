import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { totalPayoutLeftDistCompanyEndpoint as endpoint } from "../apiEndpoints";
import { getTotalCompanyProps } from "../getYearlyPayoutType";

const TotalPayOutLeftDistCompanyAPI = async ({
  header,
  partnerId,
  category,
}: getTotalCompanyProps) => {
  const url = endpoint(partnerId, category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default TotalPayOutLeftDistCompanyAPI;
