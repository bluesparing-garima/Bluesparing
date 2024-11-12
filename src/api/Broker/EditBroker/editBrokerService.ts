import editBrokerAPI from "./editBrokerAPI";
import { AddEditBrokerProps } from "../getBrokersTypes";

const editBrokerService = async ({ header, broker }: AddEditBrokerProps):Promise<any> => {

  try {
    const resData = await editBrokerAPI({
      header,
      broker,
    })
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

export default editBrokerService;
