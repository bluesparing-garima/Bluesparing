import getAccountManageByAccountIdAPI from "./getAccountManageByAccountIdAPI";
import { GetAccountManageByIdProps } from "../getCreditDebitTypes";

const getAccountManageByAccountIdService = async ({
  header,
  accountId,
}: GetAccountManageByIdProps): Promise<any> => {
  try {
    const res = await getAccountManageByAccountIdAPI({
      header: header,
      accountId: accountId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getAccountManageByAccountIdService;
