import GetTotalBrokerPaymentAPI from "./GetTotalBrokerPaymentAPI";
import { getTotalBrokerPaymentProps } from "../getDashboardTypes";

const GetTotalBrokerPaymentService = async ({
  header,
  category,
}: getTotalBrokerPaymentProps): Promise<any> => {
  try {
    const res = await GetTotalBrokerPaymentAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalBrokerPaymentService;
