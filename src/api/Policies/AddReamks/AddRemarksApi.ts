import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addRemarkPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyRemarks } from "../getPoliciesTypes";
import { header } from "../../../context/constant";
const AddRemarksApi = async ({ policyId, policyRemarks }: AddPolicyRemarks) => {
    const url = endpoint()
    const options: FetchOptions = {
        headers: header,
        method: "PATCH",
        body: JSON.stringify({ policyRemarks, policyId }),
    }
    return fetchInterceptor(url, options)

};

export default AddRemarksApi;