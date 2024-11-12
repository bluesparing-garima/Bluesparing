import GetMonthlyBrokerWithRecievedCompanyPaymentAPI from "./GetMonthlyBrokerWithRecievedCompanyPaymentAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyBrokerWithRecievedCompanyPaymentService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category
}: getMonthlyBrokerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerWithRecievedCompanyPaymentAPI({
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

export default GetMonthlyBrokerWithRecievedCompanyPaymentService;
