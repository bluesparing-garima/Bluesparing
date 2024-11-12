import GetMonthlyPartnerPaymentWithCompanyPaymentAPI from "./GetMonthlyPartnerPaymentWithCompanyPaymentAPI";
import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";

const GetMonthlyPartnerPaymentWithCompanyService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps):Promise<any> => {
  try {
    const res = await GetMonthlyPartnerPaymentWithCompanyPaymentAPI({
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

export default GetMonthlyPartnerPaymentWithCompanyService;
