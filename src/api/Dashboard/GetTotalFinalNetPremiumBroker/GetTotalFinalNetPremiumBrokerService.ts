import { getTotalPartnerPaymentProps } from "../getDashboardTypes";
import GetTotalFinalNetPremiumBrokerAPI from "./GetTotalFinalNetPremiumBrokerAPI";

const GetTotalFinalNetPremiumBrokerService = async ({
  header,
  category,
}: getTotalPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetTotalFinalNetPremiumBrokerAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalFinalNetPremiumBrokerService;
