import GetMonthlyPartnerCompanyFinalPreminumAPI from "./GetMonthlyPartnerCompanyFinalPreminumAPI";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyPartnerCompanyFinalPreminumService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerCompanyFinalPreminumAPI({
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

export default GetMonthlyPartnerCompanyFinalPreminumService;
