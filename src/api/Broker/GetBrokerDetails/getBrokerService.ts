import getBrokerDetailsAPI from "./getBrokerAPI";
import { GetBrokerDetailsProps } from "../getBrokersTypes";
import convertIBrokerToIBrokerVM from "../convertBrokerToIBrokerVM";
import { IBrokers, IBrokersVM } from "../../../components/Admin/Broker/IBroker";
import { IResponse } from "../../IResponse";

const getBrokerDetailsService = async ({
  header,
  brokerId,
}: GetBrokerDetailsProps): Promise<IBrokersVM> => {

  try {
    const resData = await getBrokerDetailsAPI({
      header: header,
      brokerId: brokerId,
    }) as IResponse<IBrokers>;
    const brokers = convertIBrokerToIBrokerVM(resData.data);
    return brokers;

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

export default getBrokerDetailsService;
