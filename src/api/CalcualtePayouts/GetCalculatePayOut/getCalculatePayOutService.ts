import getCalculatePayOutAPI from "./getCalculatePayOutAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayOutService = async (props: GetCalculateTypeProps): Promise<any> => {
  try {
    const resData = await getCalculatePayOutAPI(props)
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

export default getCalculatePayOutService;
