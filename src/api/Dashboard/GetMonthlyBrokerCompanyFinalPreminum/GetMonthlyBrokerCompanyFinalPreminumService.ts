import GetMonthlyBrokerCompanyFinalPremiumAPI from "./GetMonthlyBrokerCompanyFinalPreminumAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyBrokerCompanyFinalPremiumService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerCompanyFinalPremiumAPI({
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

export default GetMonthlyBrokerCompanyFinalPremiumService;
