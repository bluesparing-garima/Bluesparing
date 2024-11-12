import addLeadsAPI from "./addLeadsAPI";
import { AddEditLeadsProps } from "../getLeadsTypes";

const addLeadsService = async ({ header, lead }: AddEditLeadsProps): Promise<any> => {
  try {
    const res = await addLeadsAPI({
      header: header,
      lead: lead,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addLeadsService;
