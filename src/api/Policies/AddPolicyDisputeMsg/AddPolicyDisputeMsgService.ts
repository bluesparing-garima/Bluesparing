import AddPolicyDisputeMsgApi from "./AddPolicyDisputeMsgApi";

const AddPolicyDisputeMsgService = async ( chat : FormData): Promise<any> => {
    try {
        const res = await AddPolicyDisputeMsgApi(chat)
        return res;
    } catch (error) {
        throw error
    }

};

export default AddPolicyDisputeMsgService;
