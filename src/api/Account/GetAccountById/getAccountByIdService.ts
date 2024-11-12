import getAccountByIdAPI from "./getAccountByIdAPI";
import { GetAccountByIdProps } from "../getAccountTypes";
import convertIAccountToIAccountVM from "../convertIAccountToIAccountVM";
import { IAccounts, IAccountsVM } from "../../../components/Account/IAccounts";
import { IResponse } from "../../IResponse";

const getAccountByIdService = async ({
  header,
  accountId,
}: GetAccountByIdProps): Promise<IAccountsVM> => {

  try {
    const resData = await getAccountByIdAPI({
      header: header,
      accountId: accountId,
    })as IResponse<IAccounts>;
    const accounts = convertIAccountToIAccountVM(resData.data);
    return accounts;
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

export default getAccountByIdService;
