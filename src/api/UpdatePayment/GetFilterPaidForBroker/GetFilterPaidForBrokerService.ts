import { getFilterUnpaidPartialForBroker } from "../getCalculatationTypes";
import GetFilterPaidForBrokerAPI from "./GetFilterPaidForBrokerAPI";

const getFilterPaidForBrokerService = async (
  props: getFilterUnpaidPartialForBroker
):Promise<any> => {
  try {
    const filterRecord = await GetFilterPaidForBrokerAPI(props)
    return filterRecord
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

 
};

export default getFilterPaidForBrokerService;