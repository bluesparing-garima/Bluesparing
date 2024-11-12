import { getMonthlyPartnerPaymentProps } from "../getDashboardTypes";
import GetMonthlyPayoutBalanceAPI from "./GetMonthlyPayoutBalanceAPI";

const GetMonthlyPayoutBalanceService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps):Promise<any> => {
  try {
    const res = await GetMonthlyPayoutBalanceAPI({
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

export default GetMonthlyPayoutBalanceService;
