import GetRecievedBrokerPaymentAPI from "./GetRecievedBrokerPaymentAPI";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetRecievedBrokerPaymentService = async ({
  header,
  category,
}: getTotalBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetRecievedBrokerPaymentAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetRecievedBrokerPaymentService;
