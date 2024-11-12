import GetAccountDetailsByBrokerAPI from "./GetAccountDetailsByBrokerAPI";
import { GetAccountDetailsByBrokerProps } from "../getAccountTypes";

const GetAccountDetailsByBrokerService = async (
  props: GetAccountDetailsByBrokerProps
): Promise<any> => {

  try {
    const resData = await GetAccountDetailsByBrokerAPI(props)
    return resData
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

export default GetAccountDetailsByBrokerService;
