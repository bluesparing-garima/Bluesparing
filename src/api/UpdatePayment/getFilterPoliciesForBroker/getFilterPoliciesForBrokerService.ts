import { getFilterUnpaidPartialForBroker } from "../getCalculatationTypes";
import getFilterPoliciesForBrokerAPI from "./getFilterPoliciesForBrokerAPI";



const getFilterPoliciesForBrokerService = async (
  props: getFilterUnpaidPartialForBroker
):Promise<any > => {
  try {
    const filterRecord = await getFilterPoliciesForBrokerAPI(props)
    return filterRecord
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `getFilterPartnerPoliciesForPartnerAPI failed with error = ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }
 
};

export default getFilterPoliciesForBrokerService;
