import GetMonthlyBrokerRecievedPaymentAPI from "./GetMonthlyBrokerRecievedPaymentAPI";
import { getMonthlyBrokerPaymentProps } from "../getDashbaordTypes";

const GetMonthlyBrokerRecievedPaymentService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerRecievedPaymentAPI({
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

export default GetMonthlyBrokerRecievedPaymentService;
