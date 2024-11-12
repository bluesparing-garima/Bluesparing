import getAccountManageAPI from "./getAccountManageAPI";
import { GetManageAccountProps } from "../getCreditDebitTypes";

const getAccountManageService = async ({ header }: GetManageAccountProps):Promise<any> => {
  try {
    const res = await getAccountManageAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getAccountManageService;
