import GetDisputeDataAPI from "./GetDisputeDataAPI";

const GetDisputeDataService = async (policyId:string): Promise<any> => {
    try {
        const res = await GetDisputeDataAPI(policyId)
        return res
    } catch (error) {
        throw error
    }

};

export default GetDisputeDataService;
