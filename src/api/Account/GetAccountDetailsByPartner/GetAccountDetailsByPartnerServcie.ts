import GetAccountDetailsByPartnerAPI from "./GetAccountDetailsByPartnerAPI";
import { GetAccountDetailsByPartnerProps } from "../getAccountTypes";

const GetAccountDetailsByPartnerService = async (
  props: GetAccountDetailsByPartnerProps
): Promise<any> => {
  try {
    const resData = await GetAccountDetailsByPartnerAPI(props)
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

export default GetAccountDetailsByPartnerService;
