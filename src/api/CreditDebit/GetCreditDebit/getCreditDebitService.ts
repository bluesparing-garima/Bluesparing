import getCreditDebitAPI from "./getCreditDebitAPI";
import { GetCreditDebitProps } from "../getCreditDebitTypes";

const getCreditDebitService = async ({ header }: GetCreditDebitProps): Promise<any> => {
  try {
    const res = await getCreditDebitAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getCreditDebitService;
