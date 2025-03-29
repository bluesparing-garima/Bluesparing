import getBrokersAPI from "./getBrokersAPI";
import { GetBrokerProps } from "../getBrokersTypes";

const getBrokerService = async ({ header }: GetBrokerProps): Promise<any> => {

  try {
    const resData = await getBrokersAPI({
      header: header,
    })
    return resData
  } catch (error) {
    throw error;}

};

export default getBrokerService;
