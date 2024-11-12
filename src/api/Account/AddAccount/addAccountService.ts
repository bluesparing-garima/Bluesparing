import addAccountAPI from "./addAccountAPI";
import { AddEditAccountProps } from "../getAccountTypes";

const addAccountService = async ({ header, account }: AddEditAccountProps): Promise<any> => {
  try {
    const resData = await addAccountAPI({
      header: header,
      account: account,
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

export default addAccountService;
