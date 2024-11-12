import GetBrokerLeftDistributedPaymentAPI from "./GetBrokerLeftDistributedPaymentAPI";
import { getTotalBrokerPaymentProps } from "../getDashbaordTypes";

const GetBrokerLeftDistributedPaymentService = async ({
  header, category
}: getTotalBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetBrokerLeftDistributedPaymentAPI({
      header: header,
      category: category
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetBrokerLeftDistributedPaymentService;
