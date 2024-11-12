import deleteBrokerAPI from "./deleteBrokerAPI";
import { DeleteBrokerProps } from "../getBrokersTypes";

const deleteBrokerService = async ({
  header,
  brokerId,
  brokers,
}: DeleteBrokerProps): Promise<any> => {

  try {
    await deleteBrokerAPI({
      header,
      brokerId,
      brokers,
    })
    const deletedBrokerIndex = brokers.findIndex((broker) => broker._id === brokerId);
    brokers.splice(deletedBrokerIndex, 1);
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

export default deleteBrokerService;
