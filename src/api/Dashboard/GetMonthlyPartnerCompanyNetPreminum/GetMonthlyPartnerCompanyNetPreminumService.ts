import GetMonthlyPartnerCompanyNetPreminumAPI from "./GetMonthlyPartnerCompanyNetPreminumAPI";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyPartnerCompanyNetPreminumService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerCompanyNetPreminumAPI({
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

export default GetMonthlyPartnerCompanyNetPreminumService;
