import GetMonthlyBrokerReceivedPaymentAPI from "./GetMonthlyBrokerRecievedPaymentAPI";
import { getMonthlyBrokerPaymentProps } from "../getDashboardTypes";

const GetMonthlyBrokerReceivedPaymentService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerReceivedPaymentAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetMonthlyBrokerReceivedPaymentService;
