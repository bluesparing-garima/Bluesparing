
import SearchHealthPolicyApi from "./SearchHealthPolicyApi";

const SearchHealthPolicyService = async ( q:string): Promise<any> => {
  try {
    const res = await SearchHealthPolicyApi(q)
    return res;
  } catch (error) {
    throw error
  }

};

export default SearchHealthPolicyService;
