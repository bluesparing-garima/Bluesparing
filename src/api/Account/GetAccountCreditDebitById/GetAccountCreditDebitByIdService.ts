import GetAccountCreditDebitByIdAPI from "./GetAccountCreditDebitByIdAPI";
import { GetAccountByIdProps } from "../getAccountTypes";

const GetAccountCreditDebitByIdService = async ({
  header,
  accountId,
}: GetAccountByIdProps): Promise<any> => {

  try {
    const resData = await GetAccountCreditDebitByIdAPI({
      header: header,
      accountId: accountId,
    })
    return resData
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default GetAccountCreditDebitByIdService;
