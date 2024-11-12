import GetMonthlyPartnerPaymentAPI from "./GetMonthlyPartnerPaymentAPI";
import { getMonthlyPartnerPaymentProps } from "../getDashboardTypes";

const GetMonthlyPartnerPaymentService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyPartnerPaymentAPI({
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

export default GetMonthlyPartnerPaymentService;
