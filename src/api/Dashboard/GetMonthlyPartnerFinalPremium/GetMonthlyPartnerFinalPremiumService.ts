import { getMonthlyBrokerFinalPaymentProps } from "../getDashbaordTypes";
import GetMonthlyPartnerFinalPremiumAPI from "./GetMonthlyPartnerFinalPremiumAPI";

const GetMonthlyPartnerFinalPremiumService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerFinalPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerFinalPremiumAPI({
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

export default GetMonthlyPartnerFinalPremiumService;
