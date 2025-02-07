
import TransactionHistoryBrokerAPI from "./TransactionHistoryBrokerAPI";
import { GetBrokerTransactionHistoryProps } from "../getBrokersTypes";

const TransactionHistoryBrokerService = async ({
  header,
  transactionCode,
  brokerId,
}: GetBrokerTransactionHistoryProps): Promise<any> => {
  try {
    const res = await TransactionHistoryBrokerAPI({
      header: header,
      brokerId,
      transactionCode: transactionCode,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default TransactionHistoryBrokerService;
