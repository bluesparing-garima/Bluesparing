import getAccountManageByIdAPI from "./getAccountManageByIdAPI";
import { GetAccountManageByIdProps } from "../getCreditDebitTypes";

const getAccountManageByIdService = async ({
  header,
  accountId,
}: GetAccountManageByIdProps):Promise<any> => {
  try {
    const res = await getAccountManageByIdAPI({
      header: header,
      accountId: accountId,
    })
    return res ;
  } catch (error) {
    throw error
  }
 
};

export default getAccountManageByIdService;
