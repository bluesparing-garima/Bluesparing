import GetBrokerBalancePaymentAPI from "./GetBrokerBalancePaymentAPI";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetBrokerBalancePaymentService = async ({
  header,
  category,
}: getTotalBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetBrokerBalancePaymentAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetBrokerBalancePaymentService;
