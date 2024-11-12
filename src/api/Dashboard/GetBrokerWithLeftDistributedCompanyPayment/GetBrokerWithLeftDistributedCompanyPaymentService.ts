import GetBrokerWithLeftDistributedCompanyPaymentAPI from "./GetBrokerWithLeftDistributedCompanyPaymentAPI";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithLeftDistributedCompanyPaymentService = async ({
  header,
  brokerId,
  category,
}: getBrokerCompanyPaymentProps):Promise<any> => {
  try {
    const res = await GetBrokerWithLeftDistributedCompanyPaymentAPI({
      header: header,
      brokerId: brokerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetBrokerWithLeftDistributedCompanyPaymentService;
