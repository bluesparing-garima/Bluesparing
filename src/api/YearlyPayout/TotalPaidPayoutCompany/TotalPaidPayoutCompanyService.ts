import { getTotalCompanyProps } from "../getYearlyPayoutType";
import TotalPaidPayoutCompanyAPI from "./TotalPaidPayoutCompanyAPI";

const TotalPaidPayoutCompanyService = async ({
  header,
  partnerId,
  category,
}: getTotalCompanyProps):Promise<any> => {
  try {
    const res = await  TotalPaidPayoutCompanyAPI({
      header: header,
      partnerId,
      category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default TotalPaidPayoutCompanyService;
