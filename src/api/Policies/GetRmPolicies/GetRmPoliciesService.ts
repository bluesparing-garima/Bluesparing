import { GetMotorPoliciesProps } from "../getPoliciesTypes";
import GetRmPoliciesAPI from "./GetRmPoliciesAPI";

const GetRmPoliciesService = async ({
    header,
    startDate,
    endDate, rmId
}: GetMotorPoliciesProps): Promise<any> => {
    try {
        const res = await GetRmPoliciesAPI({
            header: header,
            startDate: startDate,
            endDate: endDate, rmId
        })
        return res;
    } catch (error) {
        throw error
    }

};

export default GetRmPoliciesService;
