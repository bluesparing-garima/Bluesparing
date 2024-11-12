import getLeadAPI from "./getLeadAPI";
import { GetLeadsProps } from "../getLeadsTypes";

const getLeadService = async ({ header }: GetLeadsProps): Promise<any> => {
  try {
    const res = getLeadAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getLeadService;
