import GetReceivedBrokerPaymentAPI from "./GetRecievedBrokerPaymentAPI";
import { getTotalBrokerPaymentProps } from "../getDashboardTypes";

const GetReceivedBrokerPaymentService = async ({
  header,
  category,
}: getTotalBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetReceivedBrokerPaymentAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetReceivedBrokerPaymentService;
