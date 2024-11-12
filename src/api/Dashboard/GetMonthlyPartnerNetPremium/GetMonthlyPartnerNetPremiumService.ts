import { getMonthlyPartnerPaymentProps } from "../getDashboardTypes";
import GetMonthlyPartnerNetPremiumAPI from "./GetMonthlyPartnerNetPremiumAPI";

const GetMonthlyPartnerNetPremiumService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerNetPremiumAPI({
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

export default GetMonthlyPartnerNetPremiumService;
