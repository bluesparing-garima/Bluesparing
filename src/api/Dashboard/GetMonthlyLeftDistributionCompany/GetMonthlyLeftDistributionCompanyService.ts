import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";
import GetMonthlyLeftDistributionCompanyAPI from "./GetMonthlyLeftDistributionCompanyAPI";

const GetMonthlyLeftDistributionCompanyService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyLeftDistributionCompanyAPI({
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

export default GetMonthlyLeftDistributionCompanyService;
