import getLeadByUserIdAPI from "./getLeadByUserIdAPI";
import { GetLeadByUserIdProps } from "../getLeadsTypes";

const getLeadByUserIdService = async ({
  header,
  userId,
}: GetLeadByUserIdProps): Promise<any> => {
  try {
    const res = await getLeadByUserIdAPI({
      header: header,
      userId: userId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getLeadByUserIdService;
