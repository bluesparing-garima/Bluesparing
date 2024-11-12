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

export default editAccountService;
