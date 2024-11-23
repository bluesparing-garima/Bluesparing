import { GetRenewedMotorPoliciesProps } from "../getPoliciesTypes";
import GetRenewedPolicyAPI from "./GetRenewedPolicyAPI";

const GetRenewedPolicyService = async ({
    header,
    startDate,
    endDate, partnerId
}: GetRenewedMotorPoliciesProps): Promise<any> => {
    try {
        const res = await GetRenewedPolicyAPI({
            header: header,
            startDate: startDate,
            endDate: endDate, partnerId
        })
        return res
    } catch (error) {
        throw error
    }

};

export default GetRenewedPolicyService;
