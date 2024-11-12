import GetMonthlyBrokerCompanyNetPremiumAPI from "./GetMonthlyBrokerCompanyNetPreminumAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerCompanyNetPremiumService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps):Promise<any> => {
  try {
    const res = await GetMonthlyBrokerCompanyNetPremiumAPI({
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

export default GetMonthlyBrokerCompanyNetPremiumService;
