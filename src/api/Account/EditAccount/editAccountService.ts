import editAccountAPI from "./editAccountAPI";
import { AddEditAccountProps } from "../getAccountTypes";

const editAccountService = async ({
  header,
  account,
  accountId,
}: AddEditAccountProps): Promise<any> => {
  try {
    const resData = await editAccountAPI({
      header,
      account,
      accountId,
    })
    return resData
  } catch (error) {
        throw error;
  }

};

export default editAccountService;
