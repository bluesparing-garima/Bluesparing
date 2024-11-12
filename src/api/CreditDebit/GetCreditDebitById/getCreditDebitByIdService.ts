import getCreditDebitByIdAPI from "./getCreditDebitByIdAPI";
import { GetCreditDebitByIdProps } from "../getCreditDebitTypes";
import convertICreditDebitToICreditDebitVM from "../convertICreditDebitToICreditDebitVM";
import { ICreditDebits, ICreditDebitsVM } from "../../../components/Account/CreditDebit/ICreditDebits";
import { IResponse } from "../../IResponse";

const getCreditDebitByIdService = async ({
  header,
  creditDebitId,
}: GetCreditDebitByIdProps): Promise<ICreditDebitsVM> => {
  try {
    const res = await getCreditDebitByIdAPI({
      header: header,
      creditDebitId: creditDebitId,
    }) as IResponse<ICreditDebits>
    return convertICreditDebitToICreditDebitVM(res.data)
  } catch (error) {
    throw error
  }


};

export default getCreditDebitByIdService;
