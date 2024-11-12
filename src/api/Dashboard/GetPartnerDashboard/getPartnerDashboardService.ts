import getPartnerDashboardAPI from "./getPartnerDashboardAPI";
import { getPartnerDashboardProps } from "../getDashboardTypes";

const getPartnerDashboardService = async ({
  header,
  partnerId,
  startDate,
  endDate,
}: getPartnerDashboardProps):Promise<any> => {
  try {
    const res = await getPartnerDashboardAPI({
      header: header,
      partnerId: partnerId,
      startDate: startDate,
      endDate: endDate,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getPartnerDashboardService;
