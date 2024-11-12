import { getTotalPartnerPaymentProps } from "../getDashboardTypes";
import GetTotalNetPremiumBrokerAPI from "./GetTotalNetPremiumBrokerAPI";


const GetTotalNetPremiumBrokerService = async ({
  header,
  category,
}: getTotalPartnerPaymentProps): Promise<any> => {
  try {
    const res = await GetTotalNetPremiumBrokerAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalNetPremiumBrokerService;
