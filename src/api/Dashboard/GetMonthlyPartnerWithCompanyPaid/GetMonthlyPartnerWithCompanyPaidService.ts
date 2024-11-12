import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";
import GetMonthlyPartnerWithCompanyPaidAPI from "./GetMonthlyPartnerWithCompanyPaidAPI";

const GetMonthlyPartnerWithCompanyPaidService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerWithCompanyPaidAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      partnerId: partnerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyPartnerWithCompanyPaidService;
