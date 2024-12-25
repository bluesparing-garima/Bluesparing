import getAdminDashboardAPI from "./getAdminDashboardAPI";
import { getAdminDashboardProps } from "../getDashboardTypes";
const getAdminDashboardService = async ({
  header,
  startDate,
  endDate,parentAdminId
}: getAdminDashboardProps):Promise<any> => {
  try {
    const res = await getAdminDashboardAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,parentAdminId
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default getAdminDashboardService;
