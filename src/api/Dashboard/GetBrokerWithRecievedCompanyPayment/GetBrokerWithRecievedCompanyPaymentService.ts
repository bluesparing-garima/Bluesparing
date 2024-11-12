import GetBrokerWithReceivedCompanyPaymentAPI from "./GetBrokerWithRecievedCompanyPaymentAPI";
import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";

const GetBrokerWithReceivedCompanyPaymentService = async ({
  header,
  brokerId, category
}: getBrokerCompanyPaymentProps):Promise<any> => {
  try {
    const res = await GetBrokerWithReceivedCompanyPaymentAPI({
      header: header,
      brokerId: brokerId,
      category: category
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetBrokerWithReceivedCompanyPaymentService;
