import { getFilterUnpaidPartialForBroker } from "../getCalculatationTypes";
import getFilterPoliciesForBrokerAPI from "./getFilterPoliciesForBrokerAPI";



const getFilterPoliciesForBrokerService = async (
  props: getFilterUnpaidPartialForBroker
):Promise<any > => {
  try {
    const filterRecord = await getFilterPoliciesForBrokerAPI(props)
    return filterRecord
  } catch (error) {
    throw error;
  }
 
};

export default getFilterPoliciesForBrokerService;
