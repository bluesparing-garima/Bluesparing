import addCreditDebitAPI from "./addCreditDebitAPI";
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";

const addCreditDebitService = async ({ header, creditDebit }: AddEditCreditDebitProps):Promise<any> => {
  try {
    const res  =await  addCreditDebitAPI({
      header: header,
      creditDebit: creditDebit,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addCreditDebitService;
