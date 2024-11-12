import GetPartnerWithCompanyPaymentAPI from "./GetPartnerWithCompanyPaymentAPI";
import { getPartnerCompanyPaymentProps } from "../getDashboardTypes";

const GetPartnerWithCompanyPaymentService = async ({
  header,
  partnerId,
  category,
}: getPartnerCompanyPaymentProps): Promise<any> => {
  try {
    const res = await GetPartnerWithCompanyPaymentAPI({
      header: header,
      partnerId: partnerId,
      category: category,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetPartnerWithCompanyPaymentService;
