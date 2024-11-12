import GetMonthlyBrokerCompanyFinalPreminumAPI from "./GetMonthlyBrokerCompanyFinalPreminumAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyBrokerCompanyFinalPreminumService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps): Promise<any> => {
  try {
    const res = await GetMonthlyBrokerCompanyFinalPreminumAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetMonthlyBrokerCompanyFinalPreminumService;
