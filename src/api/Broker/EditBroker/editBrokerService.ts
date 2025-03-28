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
    throw error;}
 
};

export default editBrokerService;
