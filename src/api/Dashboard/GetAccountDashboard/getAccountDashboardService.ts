import getAccountDashboardAPI from "./getAccountDashboardAPI";
import { getAccountDashboardProps } from "../getDashbaordTypes";

const getAccountDashboardService = async ({
  header, startDate, endDate
}: getAccountDashboardProps): Promise<any> => {
  try {
    const res = await getAccountDashboardAPI({
      header: header, startDate, endDate
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getAccountDashboardService;
