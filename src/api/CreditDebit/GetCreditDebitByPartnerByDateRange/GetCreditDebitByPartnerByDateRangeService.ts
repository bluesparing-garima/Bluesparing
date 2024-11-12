import GetCreditDebitByPartnerByDateRangeAPI from "./GetCreditDebitByPartnerByDateRangeAPI";
import { GetCreditDebitByPartnerDateRangeProps } from "../getCreditDebitTypes";
//import convertICreditDebitToICreditDebitVM from "../convertICreditDebitToICreditDebitVM";

const GetCreditDebitByPartnerByDateRangeService = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: GetCreditDebitByPartnerDateRangeProps):Promise<any> => {
  try {
    const res = await GetCreditDebitByPartnerByDateRangeAPI({
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

export default GetCreditDebitByPartnerByDateRangeService;
