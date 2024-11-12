import GetAccountManageByPartnerByDateRangeAPI from "./GetAccountManageByPartnerByDateRangeAPI";
import { GetCreditDebitByPartnerDateRangeProps } from "../getCreditDebitTypes";
const GetAccountManageByPartnerByDateRangeService = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: GetCreditDebitByPartnerDateRangeProps): Promise<any> => {
  try {
    const res = await GetAccountManageByPartnerByDateRangeAPI({
      header: header,
      partnerId: partnerId,
      startDate: startDate,
      endDate: endDate,
    })
    return res;
  } catch (error) {
    throw error
  }
};
export default GetAccountManageByPartnerByDateRangeService;
