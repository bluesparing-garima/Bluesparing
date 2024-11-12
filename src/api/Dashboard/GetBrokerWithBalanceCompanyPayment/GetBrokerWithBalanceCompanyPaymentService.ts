import GetBrokerWithBalanceCompanyPaymentAPI from "./GetBrokerWithBalanceCompanyPaymentAPI";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithBalanceCompanyPaymentService = async ({
  header,
  brokerId,
  category,
}: getBrokerCompanyPaymentProps):Promise<any> => {
  try {
    const res = await GetBrokerWithBalanceCompanyPaymentAPI({
      header: header,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetBrokerWithBalanceCompanyPaymentService;
