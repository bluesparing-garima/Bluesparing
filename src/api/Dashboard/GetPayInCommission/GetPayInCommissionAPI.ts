import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPayInCommissionDataEndpoint as endpoint } from "../apiEndPoints";
import { getPayInCommissionProps } from "../getDashboardTypes";

const GetPayInCommissionAPI = async ({
  header,
  filter,
  broker,
}: getPayInCommissionProps) => {
  const url = endpoint(broker, filter)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetPayInCommissionAPI;
