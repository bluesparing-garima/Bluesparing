import { getTotalPartnerPaymentProps } from "../getDashboardTypes";
import GetTotalFinalNetPremiumPartnerAPI from "./GetTotalFinalNetPremiumPartnerAPI";


const GetTotalFinalNetPremiumPartnerService = async ({
  header,
  category,
}: getTotalPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetTotalFinalNetPremiumPartnerAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalFinalNetPremiumPartnerService;
