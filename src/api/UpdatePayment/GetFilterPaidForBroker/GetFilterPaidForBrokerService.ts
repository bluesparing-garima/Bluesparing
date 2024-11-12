import { getFilterUnpaidPartialForBroker } from "../getCalculatationTypes";
import GetFilterPaidForBrokerAPI from "./GetFilterPaidForBrokerAPI";

const getFilterPaidForBrokerService = async (
  props: getFilterUnpaidPartialForBroker
):Promise<any> => {
  try {
    const filterRecord = await GetFilterPaidForBrokerAPI(props)
    return filterRecord
  } catch (error) {
    throw error;
  }

 
};

export default getFilterPaidForBrokerService;