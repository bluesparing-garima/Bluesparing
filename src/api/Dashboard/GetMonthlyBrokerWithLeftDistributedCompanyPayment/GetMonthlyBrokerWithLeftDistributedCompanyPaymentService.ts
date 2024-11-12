import GetMonthlyBrokerWithLeftDistributedCompanyPaymentPaymentAPI from "./GetMonthlyBrokerWithLeftDistributedCompanyPaymentPaymentAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerWithLeftDistributedCompanyPaymentService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps):Promise<any>=> {
  try {
    const res = await GetMonthlyBrokerWithLeftDistributedCompanyPaymentPaymentAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetMonthlyBrokerWithLeftDistributedCompanyPaymentService;
