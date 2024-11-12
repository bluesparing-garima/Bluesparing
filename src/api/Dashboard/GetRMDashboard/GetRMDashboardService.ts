
import { getAccountDashboardProps } from "../getDashbaordTypes";
import GetRMDashboardAPI from "./GetRMDashboardAPI";

const GetRMDashboardService = async ({
  header,
  startDate,
  endDate, rmId
}: getAccountDashboardProps): Promise<any> => {
  try {
    const res = await GetRMDashboardAPI({
      header: header,
      startDate: startDate,
      endDate: endDate, rmId
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetRMDashboardService;