import { getBarChartDashboard } from "./getBarChartDashboardAPI";
import { GetBarChartDashboardProps } from "../getDashbaordTypes";
const getBarChartDashboardService = (props: GetBarChartDashboardProps) => {
  try {
    const res = getBarChartDashboard(props);
    return res
  } catch (error) {
    throw error
  }

};

export default getBarChartDashboardService;
