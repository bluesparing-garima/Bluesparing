import GetCreditDebitByPartnerAPI from "./GetCreditDebitByPartnerAPI";
import { GetCreditDebitByPartnerProps } from "../getCreditDebitTypes";
const GetCreditDebitByPartnerService = async ({
  header,
  partnerId
}: GetCreditDebitByPartnerProps): Promise<any> => {
  try {
    const res = await GetCreditDebitByPartnerAPI({
      header: header,
      partnerId: partnerId
    })
    return res;
  } catch (error) {
    throw error
  }
};
export default GetCreditDebitByPartnerService;
