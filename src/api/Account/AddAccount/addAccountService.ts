import addAccountAPI from "./addAccountAPI";
import { AddEditAccountProps } from "../getAccountTypes";

const addAccountService = async ({
  header,
  account,
}: AddEditAccountProps): Promise<any> => {
  try {
    const resData = await addAccountAPI({
      header: header,
      account: account,
    });
    return resData;
  } catch (error) {
    throw error;
  }
};

export default addAccountService;
