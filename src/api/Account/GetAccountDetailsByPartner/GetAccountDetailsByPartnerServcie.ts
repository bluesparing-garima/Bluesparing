import GetAccountDetailsByPartnerAPI from "./GetAccountDetailsByPartnerAPI";
import { GetAccountDetailsByPartnerProps } from "../getAccountTypes";

const GetAccountDetailsByPartnerService = async (
  props: GetAccountDetailsByPartnerProps
): Promise<any> => {
  try {
    const resData = await GetAccountDetailsByPartnerAPI(props)
    return resData
  } catch (error) {
    throw error;}

};

export default GetAccountDetailsByPartnerService;
