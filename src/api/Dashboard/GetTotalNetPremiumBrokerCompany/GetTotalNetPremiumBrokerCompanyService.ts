import { getBrokerCompanyPaymentProps } from "../getDashbaordTypes";
import GetTotalNetPremiumBrokerCompanyAPI from "./GetTotalNetPremiumBrokerCompanyAPi";


const GetTotalNetPremiumBrokerCompanyService = async ({
    header,
    brokerId,
    category,
}: getBrokerCompanyPaymentProps): Promise<any> => {
    try {
        const res = await GetTotalNetPremiumBrokerCompanyAPI({
            header: header,
            brokerId,
            category: category,
        })
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetTotalNetPremiumBrokerCompanyService;
