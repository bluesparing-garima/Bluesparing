import getLeadByIdAPI from "./getLeadByIdAPI";
import { GetLeadByIdProps } from "../getLeadsTypes";

const getLeadByIdService = async ({ header, leadId }: GetLeadByIdProps): Promise<any> => {
  try {
    const res = await getLeadByIdAPI({
      header: header,
      leadId: leadId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getLeadByIdService;
