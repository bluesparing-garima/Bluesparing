import GetCreditDebitByPartnerByDateRangeAPI from "./GetCreditDebitByBrokerByDateRangeAPI";
import { GetCreditDebitByBrokerProps } from "../getCreditDebitTypes";

const GetCreditDebitByBrokerByDateRangeService = async ({
  header,
  brokerId,
  startDate,
  endDate,
}: GetCreditDebitByBrokerProps):Promise<any> => {
  try {
    const res = await GetCreditDebitByPartnerByDateRangeAPI({
      header: header,
      brokerId: brokerId,
      startDate: startDate,
      endDate: endDate,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetCreditDebitByBrokerByDateRangeService;
