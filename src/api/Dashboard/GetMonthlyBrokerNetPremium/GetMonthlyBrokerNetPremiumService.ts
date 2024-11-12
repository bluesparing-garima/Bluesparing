import { getMonthlyBrokerPaymentProps } from "../getDashbaordTypes";
import GetMonthlyBrokerNetPremiumAPI from "./GetMonthlyBrokerNetPremiumAPI";

const GetMonthlyBrokerNetPremiumService = async ({
  header,
  startDate,
  endDate,
  category,
}: getMonthlyBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerNetPremiumAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetMonthlyBrokerNetPremiumService;
