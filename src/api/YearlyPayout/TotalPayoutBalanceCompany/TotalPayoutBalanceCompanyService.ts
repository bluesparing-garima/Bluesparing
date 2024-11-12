import { getTotalCompanyProps } from "../getYearlyPayoutType";
import TotalPayoutBalanceCompanyAPI from "./TotalPayoutBalanceCompanyAPI";

const TotalPayoutBalanceCompanyService = async ({
  header,
  partnerId,
  category,
}: getTotalCompanyProps): Promise<any> => {
  try {
    const res = await TotalPayoutBalanceCompanyAPI({
      header: header,
      partnerId,
      category,
    })
    return res;
  } catch (error) {
    throw error
  }

};
export default TotalPayoutBalanceCompanyService;
