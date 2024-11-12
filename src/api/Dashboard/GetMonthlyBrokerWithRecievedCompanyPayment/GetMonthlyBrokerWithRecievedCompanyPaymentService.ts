import GetMonthlyBrokerWithReceivedCompanyPaymentAPI from "./GetMonthlyBrokerWithRecievedCompanyPaymentAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerWithReceivedCompanyPaymentService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category
}: getMonthlyBrokerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerWithReceivedCompanyPaymentAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      brokerId: brokerId,
      category: category
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyBrokerWithReceivedCompanyPaymentService;
