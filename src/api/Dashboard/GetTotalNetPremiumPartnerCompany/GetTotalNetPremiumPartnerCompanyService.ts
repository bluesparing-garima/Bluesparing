import { getPartnerCompanyPaymentProps } from "../getDashboardTypes";
import GetTotalNetPremiumPartnerCompanyAPI from "./GetTotalNetPremiumPartnerCompanyAPi";

const GetTotalNetPremiumPartnerCompanyService = async ({
    header,
    partnerId,
    category,
}: getPartnerCompanyPaymentProps): Promise<any> => {
    try {
        const res = await GetTotalNetPremiumPartnerCompanyAPI({
            header: header,
            partnerId: partnerId,
            category: category,
        })
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetTotalNetPremiumPartnerCompanyService;
