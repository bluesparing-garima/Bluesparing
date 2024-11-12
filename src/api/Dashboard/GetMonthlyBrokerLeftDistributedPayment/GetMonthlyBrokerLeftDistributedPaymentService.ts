import GetMonthlyBrokerLeftDistributedPaymentAPI from "./GetMonthlyBrokerLeftDistributedPaymentAPI";
import { getMonthlyBrokerPaymentProps } from "../getDashboardTypes";

const GetMonthlyBrokerLeftDistributedPaymentService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerLeftDistributedPaymentAPI({
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

export default GetMonthlyBrokerLeftDistributedPaymentService;
