import { getMonthlyBrokerFinalPaymentProps } from "../getDashbaordTypes";
import GetMonthlyBrokerFinalPremiumAPI from "./GetMonthlyBrokerFinalPremiumAPI";

const GetMonthlyBrokerFinalPremiumService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerFinalPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerFinalPremiumAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyBrokerFinalPremiumService;
