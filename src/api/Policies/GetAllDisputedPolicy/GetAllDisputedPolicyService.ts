import GetAllDisputedPolicyAPI from "./GetAllDisputedPolicyAPI";
const GetAllDisputedPolicyService = async (): Promise<any> => {
  try {
    const res = await GetAllDisputedPolicyAPI()
    return res;
  } catch (error) {
    throw error
  }
};
export default GetAllDisputedPolicyService;
