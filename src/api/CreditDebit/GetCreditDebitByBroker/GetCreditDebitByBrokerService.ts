import GetCreditDebitByBrokerAPI from "./GetCreditDebitByBrokerAPI";
import { GetCreditDebitByBrokerProps } from "../getCreditDebitTypes";
const GetCreditDebitByBrokerService = async ({
  header,
  brokerId,
  startDate,
  endDate,
}: GetCreditDebitByBrokerProps):Promise<any> => {
  try {
    const res = await  GetCreditDebitByBrokerAPI({
      header: header,
      brokerId: brokerId,
      startDate: startDate,
      endDate: endDate,
    })
    return res ;
  } catch (error) {
    throw error
  }
};
export default GetCreditDebitByBrokerService;
