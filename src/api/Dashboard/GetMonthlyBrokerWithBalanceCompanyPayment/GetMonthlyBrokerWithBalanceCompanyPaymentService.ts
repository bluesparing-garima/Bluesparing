import GetMonthlyBrokerWithBalanceCompanyPaymentPaymentAPI from "./GetMonthlyBrokerWithBalanceCompanyPaymentPaymentAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerWithBalanceCompanyPaymentService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerWithBalanceCompanyPaymentPaymentAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyBrokerWithBalanceCompanyPaymentService;
