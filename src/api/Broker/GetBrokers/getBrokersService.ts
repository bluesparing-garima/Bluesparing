import getBrokersAPI from "./getBrokersAPI";
import { GetBrokerProps } from "../getBrokersTypes";

const getBrokerService = async ({ header }: GetBrokerProps): Promise<any> => {

  try {
    const resData = await getBrokersAPI({
      header: header,
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

export default getBrokerService;
