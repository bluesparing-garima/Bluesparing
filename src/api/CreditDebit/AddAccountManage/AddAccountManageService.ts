
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";
import addAccountManageAPI from "./AddAccountManageAPI";

const addAccountManageService = async ({ header, creditDebit }: AddEditCreditDebitProps): Promise<any> => {
  try {
    const res = await addAccountManageAPI({
      header: header,
      creditDebit: creditDebit,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default addAccountManageService;