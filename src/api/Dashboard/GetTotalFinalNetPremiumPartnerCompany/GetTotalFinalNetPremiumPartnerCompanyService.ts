import { getPartnerCompanyPaymentProps } from "../getDashbaordTypes";
import GetTotalFinalNetPremiumPartnerCompanyAPI from "./GetTotalFinalNetPremiumPartnerCompanyAPi";


const GetTotalFinalNetPremiumPartnerCompanyService = async ({
    header,
    partnerId,
    category,
}: getPartnerCompanyPaymentProps): Promise<any> => {
    try {
        const res = await GetTotalFinalNetPremiumPartnerCompanyAPI({
            header: header,
            partnerId: partnerId,
            category: category,
        })
        return res;
    } catch (error) {
        throw error
    }

};

export default GetTotalFinalNetPremiumPartnerCompanyService;
