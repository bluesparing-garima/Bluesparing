import GetPartnerPolicyDataAPI from "./GetPartnerPolicyDataAPI";
import { getPartnerCommissionProps } from "../getDashboardTypes";

const GetPartnerPolicyDataService = async ({
  header,
  filter,
  partnerId,
}: getPartnerCommissionProps): Promise<any> => {
  try {
    const res = await GetPartnerPolicyDataAPI({
      header: header,
      filter: filter,
      partnerId: partnerId,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default GetPartnerPolicyDataService;
