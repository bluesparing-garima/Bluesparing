import getFilterPoliciesByDateAPI from "./getFilterPoliciesByDateAPI";
import { GetFilterPoliciesByDateTypeProps } from "../getCalculatationTypes";

const getFilterPoliciesByDateService = async (
  props: GetFilterPoliciesByDateTypeProps
): Promise<any> => {
  try {
    const res = await getFilterPoliciesByDateAPI(props)
    return res;
  } catch (error) {
    throw error
  }

};

export default getFilterPoliciesByDateService;
