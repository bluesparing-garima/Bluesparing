import GetMonthlyBrokerCompanyNetPreminumAPI from "./GetMonthlyBrokerCompanyNetPreminumAPI";
import { getMonthlyBrokerPaymentWithCompanyProps } from "../getDashbaordTypes";

const GetMonthlyBrokerCompanyNetPreminumService = async ({
  header,
  startDate,
  endDate,
  brokerId,
  category,
}: getMonthlyBrokerPaymentWithCompanyProps):Promise<any> => {
  try {
    const res = await GetMonthlyBrokerCompanyNetPreminumAPI({
      header: header,
      startDate: startDate,
      endDate: endDate,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetMonthlyBrokerCompanyNetPreminumService;
