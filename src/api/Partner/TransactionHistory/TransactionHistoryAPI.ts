import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { transactionHistoryPartnerEndpoint as endpoint } from "../apiEndpoints";
import { DebitTransactionProps } from "../getPartnersTypes";

const TransactionHistoryAPI = async ({
  header,
  transactionCode,
  partnerId,
}: DebitTransactionProps) => {
  const url = endpoint(transactionCode!, partnerId!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default TransactionHistoryAPI;
