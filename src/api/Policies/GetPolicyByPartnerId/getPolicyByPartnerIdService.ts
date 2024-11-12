import getPolicyByPartnerIdAPI from "./getPolicyByPartnerIdAPI";
import { GetPolicyByPartnerIdProps } from "../getPoliciesTypes";

const getPolicyByPartnerIdService = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: GetPolicyByPartnerIdProps):Promise<any> => {
  try {
    const res = await getPolicyByPartnerIdAPI({
      header: header,
      partnerId: partnerId,
      startDate,
      endDate,
    })
    return  res;
  } catch (error) {
    throw error
  }
 
};

export default getPolicyByPartnerIdService;
