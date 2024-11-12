import { getTotalPartnerPaymentProps } from "../getDashboardTypes";
import GetTotalNetPremiumPartnerAPI from "./GetTotalNetPremiumPartnerAPI";

const GetTotalNetPremiumPartnerService = async ({
  header,
  category,
}: getTotalPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetTotalNetPremiumPartnerAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalNetPremiumPartnerService;
