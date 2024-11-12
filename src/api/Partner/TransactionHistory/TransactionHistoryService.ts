import TransactionHistoryAPI from "./TransactionHistoryAPI";
import { DebitTransactionProps } from "../getPartnersTypes";

const TransactionHistoryService = async ({
  header,
  transactionCode,
  partnerId,
}: DebitTransactionProps):Promise<any> => {
  try {
    const res = await TransactionHistoryAPI({
      header: header,
      partnerId: partnerId,
      transactionCode: transactionCode,
    })
    return res;
  } catch (error) {
    throw error
  }
 
};

export default TransactionHistoryService;
