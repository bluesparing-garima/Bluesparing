import addQuotationAPI from "./addQuotationAPI";
import { AddEditQuotationProps } from "../getQuotationTypes";
const addQuotationService = async ({ header, quotation }: AddEditQuotationProps):Promise<any> => {
  try {
    const res = await addQuotationAPI({
      header: header,
      quotation: quotation,
    })
    return res;
  } catch (error) {
    throw error
  }
};
export default addQuotationService;
