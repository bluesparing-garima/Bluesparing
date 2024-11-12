
import { GetPolicyByNumberProps } from "../getPoliciesTypes";
import getPolicyDataByPolicyNumberAPI from "./getPolicyDataByPolicyNumberAPI";

const getPolicyDataByPolicyNumberService = async ({
    header,
    policyNumber,
}: GetPolicyByNumberProps): Promise<any> => {
    try {
        const res = await getPolicyDataByPolicyNumberAPI({
            header: header,
            policyNumber: policyNumber,
        })
        return res;
    } catch (error) {
        throw error
    }

};

export default getPolicyDataByPolicyNumberService;