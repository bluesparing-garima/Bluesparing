import getLeadByPartnerIdAPI from "./getLeadByPartnerIdAPI";
import { GetLeadByPartnerIdProps } from "../getLeadsTypes";

const getLeadByPartnerIdService = async ({
  header,
  partnerId,
}: GetLeadByPartnerIdProps): Promise<any> => {
  try {
    const res = await getLeadByPartnerIdAPI({
      header: header,
      partnerId: partnerId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getLeadByPartnerIdService;
