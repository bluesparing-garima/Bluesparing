import editCreditDebitAPI from "./editCreditDebitAPI";
import { AddEditCreditDebitProps } from "../getCreditDebitTypes";

const editCreditDebitService = async ({
  header,
  creditDebit,
  creditDebitId,
}: AddEditCreditDebitProps): Promise<any> => {

  try {
    const res = await editCreditDebitAPI({
      header,
      creditDebit,
      creditDebitId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editCreditDebitService;
