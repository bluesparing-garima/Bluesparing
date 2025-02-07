import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { transactionHistoryBrokerEndpoint as endpoint } from '../apiEndPoints';
import { GetBrokerTransactionHistoryProps } from "../getBrokersTypes";

const TransactionHistoryBrokerAPI = async ({
  header,
  transactionCode,
  brokerId,
}: GetBrokerTransactionHistoryProps) => {
  const url = endpoint(transactionCode!, brokerId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default TransactionHistoryBrokerAPI;
