import { getTotalCompanyProps } from "../getYearlyPayoutType";
import TotalPayOutLeftDistCompanyAPI from "./TotalPayOutLeftDistCompanyAPI";

const TotalPayOutLeftDistCompanyService = async ({
  header,
  partnerId,
  category,
}: getTotalCompanyProps): Promise<any> => {
  try {
    const res = await TotalPayOutLeftDistCompanyAPI({
      header: header,
      partnerId,
      category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default TotalPayOutLeftDistCompanyService;
