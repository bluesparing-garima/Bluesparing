import GetBrokerWithCompanyPaymentAPI from "./GetBrokerWithCompanyPaymentAPI";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithCompanyPaymentService = async ({
  header,
  brokerId,
  category
}: getBrokerCompanyPaymentProps): Promise<any> => {
  try {
    const res = await GetBrokerWithCompanyPaymentAPI({
      header: header,
      brokerId: brokerId,
      category: category
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetBrokerWithCompanyPaymentService;
