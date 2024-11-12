import getOperationDashboardAPI from "./GetOperationDashboardAPI";
import { getOperationDashboardProps } from "../getDashboardTypes";

const getOperationDashboardService = async ({
  header,
  operationUserId,
}: getOperationDashboardProps):Promise<any> => {
  try {
    const res = await getOperationDashboardAPI({
      header: header,
      operationUserId: operationUserId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getOperationDashboardService;
