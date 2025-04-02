import addBrokerAPI from "./addBrokerAPI";
import { AddEditBrokerProps } from "../getBrokersTypes";

const addBrokerService = async ({ header, broker }: AddEditBrokerProps):Promise<any> => {
  try {


    const resData = await addBrokerAPI({
      header: header,
      broker: broker,
    })
    return resData
  } catch (error) {
    throw error;}


};

export default addBrokerService;
