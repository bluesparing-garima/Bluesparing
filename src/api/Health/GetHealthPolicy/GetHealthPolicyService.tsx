
import { FilterTypes } from "../Endpoints";
import GetHealthPolicyAPI from "./GetHealthPolicyAPI";

const GetHealthPolicyService = async ( limit?: number,
  page?: number,
  sortedBy?: string,
  q?: FilterTypes,
  order?: string): Promise<any> => {
  try {
    const res = await GetHealthPolicyAPI(limit,page,sortedBy,q,order)
    return res;
  } catch (error) {
    throw error
  }

};

export default GetHealthPolicyService;
