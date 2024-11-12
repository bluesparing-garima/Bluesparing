import GetMonthlyBrokerBalancePaymentAPI from "./GetMonthlyBrokerBalancePaymentAPI";
import { getMonthlyBrokerPaymentProps } from "../getDashbaordTypes";

const GetMonthlyBrokerBalancePaymentService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerBalancePaymentAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyBrokerBalancePaymentService;
