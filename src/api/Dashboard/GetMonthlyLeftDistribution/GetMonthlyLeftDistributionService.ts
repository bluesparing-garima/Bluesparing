import { getMonthlyPartnerPaymentProps } from "../getDashboardTypes";
import GetMonthlyLeftDistributionAPI from "./GetMonthlyLeftDistributionAPI";

const GetMonthlyLeftDistributionService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyPartnerPaymentProps):Promise<any> => {
  try {
    const res = await GetMonthlyLeftDistributionAPI({
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

export default GetMonthlyLeftDistributionService;
