import editLeadAPI from "./editLeadAPI";
import { AddEditLeadsProps } from "../getLeadsTypes";

const editLeadService = async ({ header, lead, leadId }: AddEditLeadsProps): Promise<any> => {
  try {
    const res = await editLeadAPI({
      header,
      lead,
      leadId,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default editLeadService;
