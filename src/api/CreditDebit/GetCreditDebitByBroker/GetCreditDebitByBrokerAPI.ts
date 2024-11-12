import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCreditDebitsByBrokerEndpoint as endpoint } from "../apiEndpoints";
import { GetCreditDebitByBrokerProps } from "../getCreditDebitTypes";

const GetCreditDebitByBrokerAPI = async ({
  header,
  brokerId,startDate, endDate
}: GetCreditDebitByBrokerProps) => {
  const url = endpoint(brokerId, startDate, endDate)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetCreditDebitByBrokerAPI;
