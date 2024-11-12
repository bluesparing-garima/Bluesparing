import getFilterPoliciesAPI from "./getFilterPoliciesAPI";
import { GetFilterPoliciesTypeProps } from "../getCalculatationTypes";

const getFilterPoliciesService = async (props: GetFilterPoliciesTypeProps): Promise<any> => {
  try {
    const res = await getFilterPoliciesAPI(props)
    return res
  } catch (error) {
    throw error
  }

};

export default getFilterPoliciesService;
