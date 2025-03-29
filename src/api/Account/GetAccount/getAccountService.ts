import getAccountAPI from "./getAccountAPI";
import { GetAccountProps } from "../getAccountTypes";

const getAccountService = async ({ header }: GetAccountProps): Promise<any> => {

  try {
    const resData = await getAccountAPI({
      header: header,
    })
    return resData
  } catch (error) {
    throw error;}


};

export default getAccountService;
