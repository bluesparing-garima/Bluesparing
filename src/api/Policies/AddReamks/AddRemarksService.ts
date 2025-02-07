import { AddPolicyRemarks } from "../getPoliciesTypes";
import AddRemarksApi from "./AddRemarksApi";

const AddRemarksService = async ({
    policyRemarks,
    policyId,
}: AddPolicyRemarks): Promise<any> => {
    try {
        const res = await AddRemarksApi({
            policyRemarks,
            policyId
        })
        return res
    } catch (error) {
        throw error
    }

};

export default AddRemarksService;
