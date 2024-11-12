import { getMonthlyPartnerPaymentWithCompanyProps } from "../getDashboardTypes";
import GetMonthlyPayOutBalWithCompanyAPI from "./GetMonthlyPayOutBalWithCompanyAPI";

const GetMonthlyPayOutBalWithCompanyService = async ({
  header,
  startDate,
  endDate,
  partnerId,
  category,
}: getMonthlyPartnerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyPayOutBalWithCompanyAPI({
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

export default GetMonthlyPayOutBalWithCompanyService;
