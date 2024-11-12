import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { TotalPaidPayoutEndpoint as endpoint } from "../apiEndpoints";
import { getTotalProps } from "../getYearlyPayoutType";

const TotalPaidPayoutAPI = async ({ header, category }: getTotalProps) => {
  const url = endpoint( category)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
};

export default TotalPaidPayoutAPI;
