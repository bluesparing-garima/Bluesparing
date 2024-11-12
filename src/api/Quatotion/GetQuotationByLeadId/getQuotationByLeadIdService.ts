import getQuotationByLeadIdAPI from "./getQuotationByLeadIdAPI";
import { GetQuotationByLeadIdProps } from "../getQuotationTypes";

const getQuotationByLeadIdService = async ({
  header,
  leadId,
}: GetQuotationByLeadIdProps):Promise<any> => {
  try {
    const res = await getQuotationByLeadIdAPI({
      header: header,
      leadId: leadId,
    })
    return res;
  } catch (error) {
    throw error
  }
 
};

export default getQuotationByLeadIdService;
