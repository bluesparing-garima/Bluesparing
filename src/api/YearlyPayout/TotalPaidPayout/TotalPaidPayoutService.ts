import { getTotalProps } from "../getYearlyPayoutType";
import TotalPaidPayoutAPI from "./TotalPaidPayoutAPI";

const TotalPaidPayoutService = async ({ header, category }: getTotalProps): Promise<any> => {
  try {
    const res = await TotalPaidPayoutAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default TotalPaidPayoutService;
