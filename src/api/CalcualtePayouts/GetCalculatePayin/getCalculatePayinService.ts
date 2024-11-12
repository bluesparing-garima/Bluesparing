import getCalculatePayinAPI from "./getCalculatePayinAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayinService = async (props: GetCalculateTypeProps): Promise<any> => {
  try {
    const resData = await getCalculatePayinAPI(props)
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

export default getCalculatePayinService;
