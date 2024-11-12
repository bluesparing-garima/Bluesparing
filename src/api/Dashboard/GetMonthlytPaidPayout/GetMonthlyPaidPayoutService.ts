import { getMonthlyPartnerPaymentProps } from "../getDashboardTypes";
import GetMonthlyPaidPayoutAPI from "./GetMonthlyPaidPayoutAPI";

const GetMonthlyPaidPayoutService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyPaidPayoutAPI({
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

export default GetMonthlyPaidPayoutService;
