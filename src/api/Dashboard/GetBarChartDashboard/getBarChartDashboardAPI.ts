import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getBarChartEndpoint } from "../apiEndPoints";
import { GetBarChartDashboardProps } from '../getDashbaordTypes';

export const getBarChartDashboard = async ({ header, timeframe }: GetBarChartDashboardProps) => {
  const url = getBarChartEndpoint(timeframe)
  const options: FetchOptions = {
    method: "GET",
    headers: {
      ...header,
    },
  }

  return fetchInterceptor(url, options)

};
