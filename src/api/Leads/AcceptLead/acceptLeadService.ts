import acceptLeadAPI from "./acceptLeadAPI";
import { AcceptLeadsProps } from "../getLeadsTypes";

const acceptLeadService = async ({ header, lead }: AcceptLeadsProps): Promise<any> => {
  try {
    const res = await acceptLeadAPI({
      header,
      lead,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default acceptLeadService;
