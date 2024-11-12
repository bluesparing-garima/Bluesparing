import { getBrokerCompanyPaymentProps } from "../getDashboardTypes";
import GetTotalFinalNetPremiumBrokerCompanyAPI from "./GetTotalFinalNetPremiumBrokerCompanyAPi";



const GetTotalFinalNetPremiumBrokerCompanyService = async ({
    header,
    brokerId,
    category,
}: getBrokerCompanyPaymentProps): Promise<any> => {
    try {
        const res = await GetTotalFinalNetPremiumBrokerCompanyAPI({
            header: header,
            brokerId,
            category: category,
        })
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetTotalFinalNetPremiumBrokerCompanyService;
