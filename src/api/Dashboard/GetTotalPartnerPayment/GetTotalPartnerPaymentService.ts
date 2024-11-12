import GetTotalPartnerPaymentAPI from "./GetTotalPartnerPaymentAPI";
import { getTotalPartnerPaymentProps } from "../getDashboardTypes";

const GetTotalPartnerPaymentService = async ({
  header,
  category,
}: getTotalPartnerPaymentProps):Promise<any> => {
  try {
    const res = await GetTotalPartnerPaymentAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default GetTotalPartnerPaymentService;
