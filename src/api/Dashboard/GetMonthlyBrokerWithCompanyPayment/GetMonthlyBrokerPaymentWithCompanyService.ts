import GetMonthlyBrokerPaymentWithCompanyPaymentAPI from "./GetMonthlyBrokerPaymentWithCompanyPaymentAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerPaymentWithCompanyService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps):Promise<any> => {
  try {
    const res = await GetMonthlyBrokerPaymentWithCompanyPaymentAPI({
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

export default GetMonthlyBrokerPaymentWithCompanyService;
