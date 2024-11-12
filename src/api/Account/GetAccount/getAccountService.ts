import getAccountAPI from "./getAccountAPI";
import { GetAccountProps } from "../getAccountTypes";

const getAccountService = async ({ header }: GetAccountProps): Promise<any> => {

  try {
    const resData = await getAccountAPI({
      header: header,
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

export default getAccountService;
