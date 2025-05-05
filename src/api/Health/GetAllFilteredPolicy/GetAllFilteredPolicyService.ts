import GetAllFilteredPolicyAPI from "./GetAllFilteredPolicyAPI";

const GetAllFilteredPolicyService = async ( startDate:string,endDate:string): Promise<any> => {
  try {
    const res = await GetAllFilteredPolicyAPI(startDate,endDate)
    return res;
  } catch (error) {
    throw error
  }

};

export default GetAllFilteredPolicyService;
