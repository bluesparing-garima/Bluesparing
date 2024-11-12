import getAdminDashboardAPI from "./getAdminDashboardAPI";
import { getAdminDashboardProps } from "../getDashbaordTypes";
const getAdminDashboardService = async ({
  header,
  startDate,
  endDate,
}: getAdminDashboardProps):Promise<any> => {
  try {
    const res = await getAdminDashboardAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default getAdminDashboardService;
