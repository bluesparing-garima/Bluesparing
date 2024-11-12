import GetMonthlyPartnerCompanyFinalPremiumAPI from "./GetMonthlyPartnerCompanyFinalPreminumAPI";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyPartnerCompanyFinalPremiumService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerCompanyFinalPremiumAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      partnerId: partnerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetMonthlyPartnerCompanyFinalPremiumService;
