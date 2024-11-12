import GetBrokerWithRecievedCompanyPaymentAPI from "./GetBrokerWithRecievedCompanyPaymentAPI";
import { getBrokerCompanyPaymentProps } from "../getDashbaordTypes";

const GetBrokerWithRecievedCompanyPaymentService = async ({
  header,
  brokerId, category
}: getBrokerCompanyPaymentProps):Promise<any> => {
  try {
    const res = await GetBrokerWithRecievedCompanyPaymentAPI({
      header: header,
      brokerId: brokerId,
      category: category
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetBrokerWithRecievedCompanyPaymentService;
