import { getTotalProps } from "../getYearlyPayoutType";
import TotalPayoutBalanceAPI from "./TotalPayoutBalanceAPI";

const TotalPayoutBalanceService = async ({
  header,
  category,
}: getTotalProps): Promise<any> => {
  try {
    const res = await TotalPayoutBalanceAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default TotalPayoutBalanceService;
